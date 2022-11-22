interface ServerResponse {
    success: boolean;
    data?: any;
    message?: string | number | null;
    fileContent?: any;
    errors?: [ServerResponse];
  }
  
  interface IServerError {
    key: string;
    message: string;
  }
  
  export default ServerResponse;