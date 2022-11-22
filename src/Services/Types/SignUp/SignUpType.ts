import { SignUpModel } from "../../Models/SignUp/SignUpModel";

export type SignUpReducersTypes =
{
      type: "addUser";
      addUser: SignUpModel;
}

export interface SignUpReducersModel {
  addUser?: SignUpModel;
}