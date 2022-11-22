import { Dispatch } from "react";
import {Current_User, SignIn} from "../../API/Login/SignIn";
import ServerResponse from "../../../Interface/Constants/ServerResponse";

import { SignInModel } from "../../Models/Login/SignInModel";
import { UserReducersTypes } from "../../Types/UserType/UserType";
import { GetCurrentUser } from "../../../Interface/Login/LoginInterface";

export const UserSignIn =
  (payload: SignInModel) =>
  async (dispatch: Dispatch<UserReducersTypes>) => {
    try {
      const response: ServerResponse = await SignIn(payload);

      if (response.success) {
        dispatch({
          type: "GET_USER_DATA",
          fetch_user_info: response.data,
        });
        const user_type = response?.data?.user?.user_type;
        const token = response?.data?.token
        const user_id = response?.data?.user?.user_id

        localStorage.setItem('sbe_token', token);
        localStorage.setItem('sbe_user_id', user_id);
        console.log(response.data);
        if (window.location.pathname === "/login") {
            window.location.href = "/management/transactions"
          // if (user_type === "admin") {
          //   // window.location.href = "/admin/calendar";
          // } else if (user_type === "customer") {
          //   // window.location.href = "/tutor/calendar";
          // } else if (user_type === "seller") {
          //   // window.location.href = "/student/calendar";
          // }
        }
      } else {
      }
    } catch (error) {
      console.error(`action error`, error);
    }
  };
  
export const getCurrentUserData = (payload:GetCurrentUser,token) =>
async (dispatch: Dispatch<UserReducersTypes>) => {
  try {
    const response: ServerResponse = await Current_User(payload,token);

    if (response.success) {
      dispatch({
        type: "GET_USER_DATA",
        fetch_user_info: response.data,
      });
    } else {
    }
  } catch (error) {
    console.error(`action error`, error);
  }
};