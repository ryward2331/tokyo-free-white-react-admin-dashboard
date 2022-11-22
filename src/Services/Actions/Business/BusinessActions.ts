import { Dispatch } from "react";
import ServerResponse from "../../../Interface/Constants/ServerResponse";
import { addBusiness, FetchListOfType } from "../../API/Business/Business";
import { AddBusinessModel } from "../../Models/Business/BusinessModel";
import { BusinessReducersTypes } from "../../Types/Business/BusinessTypes";

export const fetchListOfTypeBusiness = () =>
async (dispatch: Dispatch<BusinessReducersTypes>) => {
  try {
    const response: ServerResponse = await FetchListOfType();
    if (response.success) {
      dispatch({
        type: "GET_BUSINESS_TYPE",
        fetch_type_list: response.data,
      });
    } else {
    }
  } catch (error) {
    console.error(`action error`, error);
  }
};

export const addBusinessAction = (payload:FormData,token) =>
async (dispatch: Dispatch<BusinessReducersTypes>) => {
  try {
    const response: ServerResponse = await addBusiness(payload,token);
    if (response.success) {
      dispatch({
        type: "ADD_BUSINESS",
        add_business: response.data,
      });
    } else {
    }
  } catch (error) {
    console.error(`action error`, error);
  }
};