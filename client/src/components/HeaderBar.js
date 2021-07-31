import React from 'react'
import logo from '../logo.svg';
import { Link } from 'react-router-dom';


function HeaderBar() {

    
    return (
        <div className="header-container">
            <header className="header navbar navbar-expand-sm">
                <a href className="sidebarCollapse mr-auto" data-placement="bottom">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </a>

                <div className="nav-logo align-self-center mr-auto">
                    <Link to="/">
                        <a className="navbar-brand" href>
                            <img src={logo} className="img-fluid" alt="logo"/>
                            <span className="navbar-brand-name">QRCode</span>
                        </a>
                    </Link>
                </div>

                <ul className="navbar-item flex-row nav-dropdowns">
                
                    <li className="nav-item dropdown user-profile-dropdown">
                        <a href className="nav-link dropdown-toggle user" id="user-profile-dropdown" data-toggle="dropdown" aria-expanded="false">
                            <div className="media">
                                <img src={logo} className="img-fluid" alt="profile"/>

                                <div className="media-body align-self-center">
                                    <h6><span>Hi,</span>Hoàng Sang</h6>
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </a>
                        <div className="dropdown-menu position-absolute animated fadeInUp" aria-labelledby="user-profile-dropdown">
                            <div className="">
                                <div className="dropdown-item">
                                <Link to="/Profile">
                                    <a className="" href>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                         My Profile
                                    </a>
                                </Link>
                                </div>
                                
                                <div className="dropdown-item">
                                <Link to="/Login">
                                    <a className="" href>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                         Sign Out
                                    </a>
                                </Link>
                                </div>
                            </div>
                        </div>

                    </li>
                </ul>
            </header>
        </div>
    )
}

export default HeaderBar
