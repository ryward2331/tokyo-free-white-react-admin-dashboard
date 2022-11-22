import { AddProductModel, AddStocksModel } from './../../Models/Stocks/StocksModel';
import { StocksReducersTypes } from './../../Types/Stocks/StockTypes';
import { getStocksByBusiness } from './../../../../../Backend/src/Repositories/StockRepo';
import { AddNewProduct, AddNewStock, GetStocksByBusiness, ListOfType } from './../../API/Stocks/Stocks';
import { Dispatch } from "react";
import ServerResponse from "../../../Interface/Constants/ServerResponse";
import { GetStockbyBusinessModel } from '../../Models/Stocks/StocksModel';

export const fetchStocksByBusiness = (payload: GetStockbyBusinessModel) =>async (dispatch: Dispatch<StocksReducersTypes>) => {
    try {

      const response: ServerResponse = await GetStocksByBusiness(payload);

    if (response.success) {
        if (response.success) {
          dispatch({
            type: "GET_STOCKS_BY_BUSINESS",
            fetch_stocks_by_business: response.data,
          });
        }
      } 
    } catch (error) {
      console.error(`action error`, error);
    }
  };
  export const fetchListOfTypeOfProduct = () =>async (dispatch: Dispatch<StocksReducersTypes>) => {
    try {

      const response: ServerResponse = await ListOfType();
      if (response.success) {
        dispatch({
          type: "GET_LIST_OF_TYPE_OF_PRODUCT",
          fetchlistOfType: response.data,
        });
      }
    } catch (error) {
      console.error(`action error`, error);
    }
  };
  export const AddProduct = (payload: AddProductModel) => async (dispatch: Dispatch<StocksReducersTypes>) => {
    try {
      const response: ServerResponse = await AddNewProduct(payload);
      if (response.success) {
          if (response.success) {
            dispatch({
              type: "ADD_PRODUCT",
              add_products: response.data,
            });
          }
  
      } 

    } catch (error) {
      console.error(`action error`, error);
    }
  };
  export const AddStock = (payload: AddStocksModel) => async (dispatch: Dispatch<StocksReducersTypes>) => {
    try {
        const response: ServerResponse = await AddNewStock(payload);
        // const response: ServerResponse = await SignUp.getAlltodolist();
        if (response.success) {
          if (response.success) {
            dispatch({
              type: "ADD_STOCKS",
              add_stocks: response.data,
            });
          }
        }
  
      } catch (error) {
      console.error(`action error`, error);
    }
  };