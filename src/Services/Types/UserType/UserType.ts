import { UserModel } from './../../Models/Login/SignInModel';

export type UserReducersTypes =
{
      type: "GET_USER_DATA";
      fetch_user_info: UserModel;
}

export interface UserReducersModel {
  fetch_user_info?: UserModel;
}
