import { UserReducersModel,UserReducersTypes } from "../../Types/UserType/UserType";


const defaultState: UserReducersModel = {
  fetch_user_info: null,
};
  const SignInReducer = (
      state: UserReducersModel = defaultState,
      action: UserReducersTypes
      ) => {
        switch (action.type) {
          case "GET_USER_DATA": {
            return {
              ...state,
              fetch_user_info: action.fetch_user_info,
            };
          }
          default:
            return state;
        }
  };

export default SignInReducer;