import React from 'react'
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
function TopBar() {
    return (
        <div className="topbar-nav header navbar" role="banner">
          <nav id="topbar">
            <ul className="navbar-nav theme-brand flex-row text-center">
              <li className="nav-item theme-logo">
                <Link to="/">
                  <a href>
                    <img src={logo} alt="logo" />
                  </a>
                </Link>
              </li>
              <li className="nav-item theme-text">
                <Link to="/">
                  <a href className="nav-link"> QRCode </a>
                </Link>
              </li>
            </ul>
            <ul className="list-unstyled menu-categories" id="topAccordion">
              <li className="menu">
                <Link to="/">
                  <a href className="dropdown-toggle">
                    <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                        <span>Tickets</span>
                    </div>
                  </a>    
                </Link>
              </li>
              
              <li className="menu">
                <Link to="/Ports">
                <a href className="dropdown-toggle">
                  <div className="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-map"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
                    <span>Ports</span>
                  </div>
                </a>    
                </Link>
              </li>
              <li className="menu">
                <Link to="/Types">
                  <a href className="dropdown-toggle">
                    <div className="">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-archive"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
                      <span>Types</span>
                    </div>
                  </a>    
                </Link>
              </li>
              <li className="menu">
                <Link to="/Users">
                  <a href className="dropdown-toggle">
                    <div className="">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      <span>Users</span>
                    </div>
                  </a>  
                </Link>  
              </li>
              <li className="menu active">
                <Link to="/Scan">
                  <a href className="dropdown-toggle">
                    <div className="">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
                      <span>Scan QRCode</span>
                    </div>
                  </a>    
                </Link>
              </li>
            </ul>
          </nav>
      </div>
    )
}

export default TopBar
