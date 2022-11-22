import { AddProductModel, AddStocksModel, GetListTypeofProduct } from './../../Models/Stocks/StocksModel';

export type StocksReducersTypes =
{
      type: "GET_STOCKS_BY_BUSINESS";
      fetch_stocks_by_business: string;
}
|
{
  type: "ADD_STOCKS";
  add_stocks: AddStocksModel;
}
|
{
  type: "ADD_PRODUCT";
  add_products: AddProductModel;
}
|
{
  type: "GET_LIST_OF_TYPE_OF_PRODUCT";
  fetchlistOfType: GetListTypeofProduct;
}

export interface StocksReducersModel {
  fetch_stocks_by_business?: string;
  add_stocks?: AddStocksModel;
  add_products?: AddProductModel;
  fetchlistOfType?:GetListTypeofProduct;
}
