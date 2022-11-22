import ReactDOM from 'react-dom';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import 'nprogress/nprogress.css';
import App from './App';
import { SidebarProvider } from './contexts/SidebarContext';
import * as serviceWorker from './serviceWorker';
import {Store} from './Services/Store'
ReactDOM.render(
  <Provider store={Store}>
    <HelmetProvider>
      <SidebarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SidebarProvider>
    </HelmetProvider>
  </Provider>
  ,
  document.getElementById('root')
);

serviceWorker.unregister();
