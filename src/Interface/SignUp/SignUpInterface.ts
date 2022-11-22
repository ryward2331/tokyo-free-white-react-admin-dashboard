export interface RegistrationModel  {
    user_id?: string;
    user_type: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    birth_date: string;
    contact_no: string;
    city: string;
    baranggay: string;
    street: string;
    email: string;
    otp?: string;
    password: string;
    confirmpassword: string;
  }
  export interface passwordValidator  {
    password: string;
    confirmpassword: string;
  }

  export interface EmailOTPModel  {
    email?: string;
  }

  export interface OTPModel  {
    otp?: string;
  }