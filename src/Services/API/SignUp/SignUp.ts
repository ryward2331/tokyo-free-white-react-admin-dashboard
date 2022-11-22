import { EmailOTPModel } from './../../../Interface/SignUp/SignUpInterface';

import { GetFetch, PostFetch } from "../../../Hooks/UseFetch";
import ServerResponse from "../../../Interface/Constants/ServerResponse";
import {OTPModel, RegistrationModel} from '../../../Interface/SignUp/SignUpInterface'
const API_DEFAULT_ROUTE = `api/register/`;


  export const AddUsers = async (payload: RegistrationModel): Promise<ServerResponse> => {
    const response = await PostFetch(API_DEFAULT_ROUTE + "registeruser", payload);
    return response;
  };
  export const SendNewOTP = async (payload: EmailOTPModel): Promise<ServerResponse> => {
    const response = await PostFetch(API_DEFAULT_ROUTE + "sendnewotp", payload);
    return response;
  };