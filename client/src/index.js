import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';

import 'react-router-dom';

import reportWebVitals from './reportWebVitals';
// let  a = 3;
// var path = window.location.href;
// var pathname = window.location.pathname

ReactDOM.render(
  <React.StrictMode>
    {/* Ngay chỗ này xác định người dùng đã đăng nhập hay chưa ?*/}
    {/* Nếu chưa chuyển người dùng tới trang Auth (Login) */}
    {/* <Auth /> */}
    {/* Nếu đã đăng nhập chuyển tới phần App (Bên trong này đã sử lý route) */}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
