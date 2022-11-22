import { fetch_baranggay, fetch_province } from './../../API/Constant/Constant';
import { GetProvince, SetProvince } from './../../Models/Constant/ConstantModel';
import { GetAlertModel, GetBaranggay } from "../../Models/Constant/ConstantModel";
import { Dispatch } from "react";
import { ConstantReducersTypes } from "../../Types/Constant/ConstantTypes";
import ServerResponse from '../../../Interface/Constants/ServerResponse';
export const setAlertMessage = (payload: GetAlertModel) =>async (dispatch: Dispatch<ConstantReducersTypes>) => {
    try {
        dispatch({
            type: "GET_ALERT",
            fetch_alert: payload,
        });
    } catch (error) {
        console.error(`action error`, error);
    }
  };

  export const getBaranggay = (payload: SetProvince) =>async (dispatch: Dispatch<ConstantReducersTypes>) => {
    try {
        const response: ServerResponse = await fetch_baranggay(payload);
        if (response.success) {
            dispatch({
                type: "GET_BARANGGAY",
                fetch_baranggay: response?.data,
            });
        }
    } catch (error) {
        console.error(`action error`, error);
    }
  };

  export const getProvince = () =>async (dispatch: Dispatch<ConstantReducersTypes>) => {
    try {
        const response: ServerResponse = await fetch_province();
        if (response.success) {
        dispatch({
            type: "GET_PROVINCE",
            fetch_province: response?.data,
        });
    }
    } catch (error) {
        console.error(`action error`, error);
    }
  };