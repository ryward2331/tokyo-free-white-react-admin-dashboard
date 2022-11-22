import { StocksReducersModel,StocksReducersTypes } from "../../Types/Stocks/StockTypes";

const defaultState: StocksReducersModel = {
  fetchlistOfType:null,
  fetch_stocks_by_business: null,
  add_stocks: null,
};
  const StockReducers = (
      state: StocksReducersModel = defaultState,
      action: StocksReducersTypes,
      ) => {
        switch (action.type) {
          case "GET_STOCKS_BY_BUSINESS": {
            return {
              ...state,
              fetch_stocks_by_business: action.fetch_stocks_by_business,
            };
          }
          case "GET_LIST_OF_TYPE_OF_PRODUCT": {
            return {
              ...state,
              fetchlistOfType: action.fetchlistOfType,
            };
          }
          case "ADD_STOCKS": {
            return {
              ...state,
              add_stocks: action.add_stocks,
            };
          }
          default:
            return state;
        }
  };

export default StockReducers;