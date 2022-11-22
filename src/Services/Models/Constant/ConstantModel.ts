export interface GetAlertModel  {
    alertMessage: string;
    alertOpen: boolean;
    typeOfAlert: string;
  }

  export interface GetBaranggay  {
    value: string;
    name: string;
  }
  export interface GetProvince  {
    value: string;
    name: string;
  }
  export interface SetProvince  {
    provincecode: string;
  }