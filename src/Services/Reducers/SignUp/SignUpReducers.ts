import { SignUpReducersTypes,SignUpReducersModel } from "../../Types/SignUp/SignUpType";

const defaultState: SignUpReducersModel = {};

const SignUpReducer = (
state: SignUpReducersModel = defaultState,action: SignUpReducersTypes): SignUpReducersModel => {
  switch (action.type) {
    case "addUser": {
      return {
        ...state,
        addUser: action.addUser,
      };
    }
    default:
      return state;
  }
};

export default SignUpReducer;