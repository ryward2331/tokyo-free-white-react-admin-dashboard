export interface getStockbyBusiness  {
    business_id: string;
  }

export interface editStocks  {
  type_id: string;
  stock_id: string;
  prod_id: string;
  name: string;
  description: string;
  type: string;
  price: string;
  qty: string;
}

export interface AddBusiness  {
  name?: string;
  type_id?: string;
  dti_no?: string;
  bir_no?: string;
  email?: string;
  contact_no?: string;
  city?: string;
  baranggay?: string;
  street?: string;
  uploaded_files:any
}