import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Auth from './pages/Login';
import Profile from './pages/Profile';
import Tickets from './pages/Tickets';
import Users from './pages/Users';
import Ports from './pages/Ports';
import Scan from './pages/Scan';
import Types from './pages/Types';
import Onboard from './pages/Onboard';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import React, { useContext } from 'react'
import { AuthContext } from './context/AuthContext';

function App() {
  const {authState: {isAuthenticated, user}} = useContext(AuthContext)
    if(isAuthenticated){
      if(user.userPosition === "Manager"){
        return (
          <Router>
            <Switch>
              <Route exact path='/' component={Onboard} />
              <Route exact path='/Tickets' component={Tickets} />
              <Route exact path='/Users' component={Users} />
              <Route exact path='/Ports' component={Ports} />
              <Route exact path='/Types' component={Types} />
              <Route exact path='/Scan' component={Scan} />
              <Route exact path='/Profile' component={Profile} />
              <Redirect from="*" to="/" />
            </Switch>
          </Router>
      );
      }
      else if(user.userPosition === "Staff"){
        return (
          <Router>
            <Switch>
              <Route exact path='/' component={Onboard} />
              <Route exact path='/Tickets' component={Tickets} />
              <Route exact path='/Profile' component={Profile} />
              <Redirect from="*" to="/Tickets" />
            </Switch>
          </Router>
      );
      }
      else {
        return (
          <Router>
            <Switch>
              <Route exact path='/' component={Onboard} />
              <Route exact path='/Scan' component={Scan} />
              <Route exact path='/Profile' component={Profile} />
              <Redirect from="*" to="/Scan" />
            </Switch>
          </Router>
        );
      }
      
    }
    else {
      return (
    
        <Router>
          <Switch>
            <Route exact path='/' component={Onboard} />
            <Route exact path='/Login' component={Auth} />
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
    );
    }
  
}

export default App;
// export default Apps;
