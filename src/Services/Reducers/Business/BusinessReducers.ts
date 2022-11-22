import { BusinessReducersModel, BusinessReducersTypes } from "../../Types/Business/BusinessTypes";

const defaultState: BusinessReducersModel = {
    fetch_type_list:null,
};
  const BusinessReducers = (
      state: BusinessReducersModel = defaultState,
      action: BusinessReducersTypes,
      ) => {
        switch (action.type) {
          case "GET_BUSINESS_TYPE": {
            return {
              ...state,
              fetch_type_list: action.fetch_type_list,
            };
          }
          case "ADD_BUSINESS": {
            return {
              ...state,
              add_business: action.add_business,
            };
          }
          default:
            return state;
        }
  };

export default BusinessReducers;