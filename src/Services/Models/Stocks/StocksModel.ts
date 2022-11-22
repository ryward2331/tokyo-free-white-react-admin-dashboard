export interface GetStockbyBusinessModel  {
  bussiness_id: string;
  }

  export interface AddStocksModel  {

    bussiness_id: string;
    product_id: string;
    price: string;
    qty: string;
}

export interface AddProductModel  {
  bussiness_id: string;
  name: string;
  price: string;
  qty: string;
  description: string;
  type_of_prod_id: string;
}

export interface EditProductModel  {
  prod_id: string;
  stock_id: string;
  bussiness_id: string;
  name: string;
  price: string;
  qty: string;
  description: string;
  type_of_prod_id: string;
}

export interface GetListTypeofProduct  {
  type_of_prod_id: string;
  name: string;
  description: string;
}