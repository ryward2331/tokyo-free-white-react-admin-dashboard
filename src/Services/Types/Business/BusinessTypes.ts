import { GetListTypeofBusiness } from '../../Models/Business/BusinessModel';

export type BusinessReducersTypes =
{
      type: "GET_BUSINESS_TYPE";
      fetch_type_list: GetListTypeofBusiness;
}
|
{
    type: "ADD_BUSINESS";
    add_business: string;
}
export interface BusinessReducersModel {
    fetch_type_list?: GetListTypeofBusiness;
    add_business?: string;
}
