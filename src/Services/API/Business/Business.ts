import { GetFetch, PostFetch, PostFetchAuthorize } from "../../../Hooks/UseFetch";
import ServerResponse from "../../../Interface/Constants/ServerResponse";
import { AddBusinessModel } from "../../Models/Business/BusinessModel";
const API_DEFAULT_ROUTE = `api/business/`;

  export const FetchListOfType = async (): Promise<ServerResponse> => {
    const response = await GetFetch(API_DEFAULT_ROUTE + "getTypeOfBussiness");
    return response;
  };

  export const addBusiness = async (payload:FormData,token): Promise<ServerResponse> => {
    const response = await PostFetchAuthorize(API_DEFAULT_ROUTE + "registerBusiness",payload,token);
    return response;
  };