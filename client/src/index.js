import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';

import 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import AuthContextProvider from "./context/AuthContext";
import PortsContextProvider from "./context/PortsContext";
import UsersContextProvider from "./context/UsersContext";
import TicketsContextProvider from "./context/TicketsContext";
import TypesContextProvider from "./context/TypesContext";
// import PagesContextProvider from "./context/PagesContext";
// let  a = 3;
// var path = window.location.href;
// var pathname = window.location.pathname

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PortsContextProvider>
        <UsersContextProvider>
          <TicketsContextProvider>
            <TypesContextProvider>
            <App />
            </TypesContextProvider>
          
          </TicketsContextProvider>
        </UsersContextProvider>
      </PortsContextProvider>
      
    </AuthContextProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
