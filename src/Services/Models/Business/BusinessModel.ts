export interface GetListTypeofBusiness  {
    value: string;
    name: string;
    description: string;
  }

  export interface AddBusinessModel{
    name?: string;
    type_id?: string;
    dti_no?: string;
    bir_no?: string;
    email?: string;
    contact_no?: string;
    city?: string;
    baranggay?: string;
    street?: string;
    uploaded_files?: {
      path?: string;
      mimetype?: string;
      name?: string;
    };
  }