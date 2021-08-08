import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Auth from './pages/Login';
import Profile from './pages/Profile';
import Tickets from './pages/Tickets';
import Users from './pages/Users';
import Ports from './pages/Ports';
import Scan from './pages/Scan';
import Types from './pages/Types';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

function App() {

  $(document).ready(function () {
    $('#dataTable').DataTable();
  });
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Tickets} />
        <Route path='/Users' component={Users} />
        <Route path='/Ports' component={Ports} />
        <Route path='/Types' component={Types} />
        <Route path='/Scan' component={Scan} />
        <Route exact path='/Login' component={Auth} />
        <Route path='/Profile' component={Profile} />
        <Redirect from="*" to="/" />
      </Switch>
      {/* Phần dưới này lấy để làm tài nguyên sử dụng cho sau này vui lòng không chỉnh sửa */}
      {/* <div>
      <HeaderBar />
        <div className="main-container" id="container">
          <div className="overlay"></div>
          <TopBar />
          <div id="content" class="main-content">
              
          <Footer />
          </div>
        </div>
      </div> */}
      
    </Router>
  );
}

export default App;
// export default Apps;
