import { OTPModel } from './../../Models/Login/SignInModel';
import { FormDataPostFetch, GetFetch, PostFetch, PostFetchAuthorize } from "../../../Hooks/UseFetch";
import ServerResponse from "../../../Interface/Constants/ServerResponse";
import {GetCurrentUser, iOTP, UserLogin} from '../../../Interface/Login/LoginInterface'
const API_DEFAULT_ROUTE = `api/user/`;

export const Current_User = async (payload:GetCurrentUser,token): Promise<ServerResponse> => {
  const response = await PostFetchAuthorize(API_DEFAULT_ROUTE + "currentUser",payload,token);
  return response;
};
export const SignIn = async (payload: UserLogin): Promise<ServerResponse> => {
    const response = await PostFetch(API_DEFAULT_ROUTE + "login", payload);
    return response;
  };

export const ActivateUser = async (payload: OTPModel): Promise<ServerResponse> => {
    const response = await PostFetch(API_DEFAULT_ROUTE + "activateUser", payload);
    return response;
  };