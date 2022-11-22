
export type UserOTPTypes =
{
    type: "SET_OTP_USER";
    otp: string;
}

export interface OTPReducer {
  otp: string;
}

const defaultState: OTPReducer = {
    otp: null,
};
  const OTPReducers = (
      state: OTPReducer = defaultState,
      action: UserOTPTypes
      ) => {
        switch (action.type) {
          case "SET_OTP_USER": {
            return {
              ...state,
              user: action.otp,
            };
          }
          default:
            return state;
        }
  };

export default OTPReducers;