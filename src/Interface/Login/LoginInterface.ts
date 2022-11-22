export interface UserLogin{
    email?: string;
    password?: string;
}
export interface GetCurrentUser{
    user_id?: string;
}
export interface iOTP{
    email?: string;
    otp?: string;
}