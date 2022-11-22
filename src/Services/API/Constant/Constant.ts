import { GetFetch, PostFetch, PostFetchAuthorize } from "../../../Hooks/UseFetch";
import ServerResponse from "../../../Interface/Constants/ServerResponse";
import { SetProvince } from "../../Models/Constant/ConstantModel";
const API_DEFAULT_ROUTE = `api/constant/`;

  export const fetch_baranggay = async (payload:SetProvince): Promise<ServerResponse> => {
    const response = await PostFetch(API_DEFAULT_ROUTE + "getBaranggay",payload);
    return response;
  };
  export const fetch_province = async (): Promise<ServerResponse> => {
    const response = await GetFetch(API_DEFAULT_ROUTE + "getAllProvince");
    return response;
  };