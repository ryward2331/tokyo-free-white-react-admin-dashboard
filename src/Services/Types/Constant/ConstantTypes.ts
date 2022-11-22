import { GetAlertModel,GetBaranggay,GetProvince } from "../../Models/Constant/ConstantModel";


export type ConstantReducersTypes =
{
      type: "GET_ALERT";
      fetch_alert: GetAlertModel;
}
|
{
    type: "GET_BARANGGAY";
    fetch_baranggay: GetBaranggay;
}
|
{
    type: "GET_PROVINCE";
    fetch_province: GetProvince;
}
export interface ConstantReducersModel {
    fetch_alert?: GetAlertModel;
    fetch_baranggay?:GetBaranggay;
    fetch_province?:GetProvince;

}
