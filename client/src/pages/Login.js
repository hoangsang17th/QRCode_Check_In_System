import React, { useCallback, useState } from 'react'
import '../assets/css/form-1.css';
import '../assets/css/switches.css';
import '../assets/css/theme-checkbox-radio.css';
import '../assets/js/form-1';
import axios from 'axios'

import Footer from '../components/Footer';


function Login() {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const onChangeUsername = useCallback((e) => {
        setUsername(e.target.value)
    },[]);

    
    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value)
    },[]);


    const loginClick = useCallback(() => {
        try {
            axios({
                method: 'post',
                url: "http://localhost:7000/api/login",
                responseType: 'json',
                data: {
                  username: username,
                  password: password
                }
              }).then(function(response) {
                    if(response.data.token != null) {
                        window.location.assign('/')
                    }
                    if(response.data.message != null) {
                        alert(response.data.message)
                    }
              });
        } catch (error) {
            alert(error)
        }
    },[username,password]);


    return (
        <div>
        <div className="form-container">
            <div className="form-form">
                <div className="form-form-wrap">
                    <div className="form-container">
                        <div className="form-content">
                            <h1 className="">Log In to <a href="/"><span className="brand-name">QR Code</span></a></h1>
                            <form className="text-left">
                                <div className="form" method="POST">
                                    <div id="username-field" className="field-wrapper input">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        <input onChange={onChangeUsername} id="username" name="username" type="text" className="form-control" placeholder="Email" />
                                    </div>

                                    <div id="password-field" className="field-wrapper input mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                        <input onChange={onChangePassword} id="password" name="password" type="password" className="form-control" placeholder="Password" />
                                    </div>
                                    <div className="d-sm-flex justify-content-between">
                                        <button className="btn btn-primary btn-block" onClick={loginClick}>Log In</button>
                                    </div>
                                </div>
                            </form>
                        </div>    
                    </div>
                    
                </div>
            </div>
            <div class="form-image">
                <div class="l-image">
                </div>
            </div>
        </div>
        <Footer />
        </div>
    )
}

export default Login
