import { EmailOTPModel } from './../../../Interface/SignUp/SignUpInterface';
import { Dispatch } from "react";
import ServerResponse from "../../../Interface/Constants/ServerResponse";

import { NewOTPModel, SignUpModel } from "../../Models/SignUp/SignUpModel";
import { SignUpReducersTypes } from "../../Types/SignUp/SignUpType";
import { UserOTPTypes } from "../../Reducers/OTP/OTPReducers";
import { AddUsers, SendNewOTP } from "../../API/SignUp/SignUp";

export const AddUser =
  (payload: SignUpModel) =>
  async (dispatch: Dispatch<SignUpReducersTypes>) => {
    try {

      const response: ServerResponse = await AddUsers(payload);

    if (response.success) {
        // const response: ServerResponse = await SignUp.getAlltodolist();

        if (response.success) {
          dispatch({
            type: "addUser",
            addUser: response.data,
          });
        }
      } 
    } catch (error) {
      console.error(`action error`, error);
    }
  };

  export const UserSendNewOTP =
  (payload:EmailOTPModel) =>
  async (dispatch: Dispatch<UserOTPTypes>) => {
    try {
      const response: ServerResponse = await SendNewOTP(payload);

    if (response.success) {
        // const response: ServerResponse = await SignUp.getAlltodolist();

        if (response.success) {
          dispatch({
            type: "SET_OTP_USER",
            otp: response.data,
          });
        }
      } 
    } catch (error) {
      console.error(`action error`, error);
    }
  };