import { fetch_baranggay, fetch_province } from './../../API/Constant/Constant';
import { ConstantReducersTypes } from './../../Types/Constant/ConstantTypes';
import { ConstantReducersModel } from "../../Types/Constant/ConstantTypes";

const defaultState: ConstantReducersModel = {
  fetch_alert:null,
  fetch_baranggay: null,
  fetch_province:null,
};
  const ConstantReducers = (
      state: ConstantReducersModel = defaultState,
      action: ConstantReducersTypes,
      ) => {
        switch (action.type) {
          case "GET_ALERT": {
            return {
              ...state,
              fetch_alert: action.fetch_alert,
            };
          }
          case "GET_BARANGGAY": {
            return {
              ...state,
              fetch_baranggay: action.fetch_baranggay,
            };
          }
          case "GET_PROVINCE": {
            return {
              ...state,
              fetch_province: action.fetch_province,
            };
          }
          default:
            return state;
        }
  };

export default ConstantReducers;