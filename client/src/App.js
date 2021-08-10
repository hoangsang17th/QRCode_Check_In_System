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
import AuthContextProvider from "./context/AuthContext";

function App() {

  $(document).ready(function () {
    $('#dataTable').DataTable();
  });
  return (
    <AuthContextProvider>
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
      </Router>
    </AuthContextProvider>
  );
}

export default App;
// export default Apps;
