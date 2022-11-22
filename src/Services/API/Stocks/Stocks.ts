import { AddProductModel, AddStocksModel, EditProductModel, GetStockbyBusinessModel } from './../../Models/Stocks/StocksModel';
import { GetFetch, PostFetch } from "../../../Hooks/UseFetch";
import ServerResponse from "../../../Interface/Constants/ServerResponse";
const API_DEFAULT_ROUTE = `api/stocks/`;
const API_DEFAULT_ROUTE_PRODUCT = `api/products/`;
  export const GetStocksByBusiness = async (payload: GetStockbyBusinessModel): Promise<ServerResponse> => {
    const response = await PostFetch(API_DEFAULT_ROUTE + "getStocksByBusiness", payload);
    return response;
  };
  
  export const AddNewProduct = async (payload: AddProductModel): Promise<ServerResponse> => {
    const response = await PostFetch(API_DEFAULT_ROUTE_PRODUCT + "addProduct", payload);
    return response;
  };
  export const EditProduct = async (payload: EditProductModel): Promise<ServerResponse> => {
    const response = await PostFetch(API_DEFAULT_ROUTE_PRODUCT + "editProduct", payload);
    return response;
  };
  export const ListOfType = async (): Promise<ServerResponse> => {
    const response = await GetFetch(API_DEFAULT_ROUTE_PRODUCT + "listOfType");
    return response;
  };

  
  export const AddNewStock = async (payload: AddStocksModel): Promise<ServerResponse> => {
    const response = await PostFetch(API_DEFAULT_ROUTE + "addStocks", payload);
    return response;
  };