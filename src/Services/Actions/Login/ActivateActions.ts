
import { Dispatch } from "react";
import {ActivateUser} from "../../API/Login/SignIn";
import ServerResponse from "../../../Interface/Constants/ServerResponse";

import { OTPModel } from "../../Models/Login/SignInModel";
import { UserReducersTypes } from "../../Types/UserType/UserType";

export const UserActivate = (payload: OTPModel) => async (dispatch: Dispatch<UserReducersTypes>) => {
    try {

      const response: ServerResponse = await ActivateUser(payload);

      if (response.success) {
        dispatch({
          type: "GET_USER_DATA",
          fetch_user_info: response.data,
        });
        if (window.location.pathname === "/otp") {
            window.location.href ="/login";
        }
      } else {
      }
    } catch (error) {
      console.error(`action error`, error);
    }
  };