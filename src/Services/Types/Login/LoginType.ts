import { SignInModel } from "../../Models/Login/SignInModel";

export type SignInReducersTypes = {
      type: "signIn";
      signIn: SignInModel;
    }

export interface SignInReducersModel {
    signIn?: SignInModel;
}
