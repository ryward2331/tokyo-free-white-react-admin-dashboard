import axios, { AxiosInstance } from "axios";
import { getRefreshToken, removeToken } from "../Helpers/AppConfig";
import qs from "qs";

import IServerResponse from "../Interface/Constants/ServerResponse";

export const Axios: AxiosInstance = axios.create();
const BASE_URL="http://localhost:6060/";
export const GetFetch = async (endpoint: string): Promise<IServerResponse> => {
  try {
    const serverResponse: IServerResponse = await Axios.get(BASE_URL+ endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
    });


    return serverResponse.data;
  } catch (error) {
    return {
      success: false,
      message: `Client error has occured. ${error}`,
    };
  }
};
export const PostFetchAuthorize = async (
  endpoint: string,
  data: any,
  authToken
): Promise<IServerResponse> => {
  try {
    const serverResponse: IServerResponse = await Axios.post(BASE_URL + endpoint,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
          withCredentials:true,
          
        },
      }
    );
    return serverResponse.data;
  } catch (error) {
    return {
      success: false,
      message: `Client error has occured. ${error}`,
    };
  }
};
export const PostFetch = async (
  endpoint: string,
  data: any
): Promise<IServerResponse> => {
  try {
    const serverResponse: IServerResponse = await Axios.post(BASE_URL + endpoint,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return serverResponse.data;
  } catch (error) {
    return {
      success: false,
      message: `Client error has occured. ${error}`,
    };
  }
};

export const FormDataPostFetch = async (
  endpoint: string,
  payload: any,
  authToken
): Promise<IServerResponse> => {
  try {
    const serverResponse: IServerResponse = await Axios.post(BASE_URL + endpoint,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
          withCredentials:true,
        },
      }
    );
    return serverResponse.data;
  } catch (error) {
    return {
      success: false,
      message: `Client error has occured. ${error}`,
    };
  }
};

let isRefreshing = false;
let refreshSubscribers: Array<any> = [];

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    if (status === 409) {
      removeToken();
      // window.location.href = "/login";
    }

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        const refresh_token = getRefreshToken();

        if (refresh_token) {
          axios({
            method: "post",
            url: `/api/token`,
            data: qs.stringify({
              grant_type: "refresh_token",
              refresh_token: refresh_token,
            }),
            headers: {
              "content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          })
            .then((response) => {
              // localStorage.setItem(
              //   APP_NAME,
              //   JSON.stringify({
              //     access_token: response.data.access_token,
              //     refresh_token: response.data.refresh_token,
              //   })
              // );
              // isRefreshing = false;
              // onRrefreshed(response.data.access_token);
              // refreshSubscribers = [];
            })
            .catch((err) => {
              // localStorage.removeItem(APP_NAME);
              removeToken();
              // alert(
              //   `Ops, it seems that your session is no longer valid. Please login again.`
              // );
              // window.location.href = "/login";
            });
        } else {
          // window.location.href = "/login";
        }
      }

      const retryOrigReq = new Promise((resolve, reject) => {
        subscribeTokenRefresh((token: any) => {
          originalRequest.headers["Authorization"] = "Bearer " + token;
          resolve(axios(originalRequest));
        });
      });
      return retryOrigReq;
    } else {
      return Promise.reject(error);
    }
  }
);

const subscribeTokenRefresh = (cb: any) => {
  refreshSubscribers.push(cb);
};

const onRrefreshed = (token: string) => {
  refreshSubscribers.map((cb) => cb(token));
};