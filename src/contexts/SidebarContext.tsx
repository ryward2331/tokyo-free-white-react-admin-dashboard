import { FC, useState, createContext, useEffect } from 'react';
import React from 'react';
import CustomSnackbar from '../Hooks/CustomSnackBar';
import { useSelector } from 'react-redux';
import { RootStore, useTypedDispatch } from '../Services/Store';
import { GetCurrentUser } from '../Interface/Login/LoginInterface';
import { Current_User } from '../Services/API/Login/SignIn';
import { getCurrentUserData } from '../Services/Actions/Login/SignInActions';

type SidebarContext = {
  sidebarToggle: any;
  toggleSidebar: () => void;
  closeSidebar: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SidebarContext = createContext<SidebarContext>(
  {} as SidebarContext
);

export const SidebarProvider: FC = ({ children }) => {
  const dispatch = useTypedDispatch();
  const fetch_alert = useSelector(
    (store: RootStore) => store.ConstantReducers.fetch_alert
  );
  useEffect(() => {
    let mounted = true;
    const fetchData = async() => {
      if(mounted){
        const user_id = localStorage.getItem('sbe_user_id');
        const token = localStorage.getItem('sbe_token');
        const payload: GetCurrentUser = {
          user_id: user_id,
        };
        const response = await Current_User(payload,token);
        if (response.success) {
          console.log(response);
          dispatch(getCurrentUserData(payload,token));
        } else {
          if (typeof response.message === "string") {
            alert(response.message);
          }
        }
      }
      
    }
    /* eslint-disable no-unused-expressions */
    fetchData();
    
  },[dispatch]);
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };
  const closeSidebar = () => {
    setSidebarToggle(false);
  };

  return (
    <>
    <SidebarContext.Provider
      value={{ sidebarToggle, toggleSidebar, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
    <CustomSnackbar AlertMessage={fetch_alert?.alertMessage} openALert={fetch_alert?.alertOpen} typeOfAlert={fetch_alert?.typeOfAlert}/>
    </>
  );
};
