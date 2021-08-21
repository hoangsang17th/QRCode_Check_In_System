import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import '../assets/css/login.css';
import '../assets/js/login';
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/Footer';
function Login() {
    // Context
    const {loginUser, authState: {isAuthenticated}} = useContext(AuthContext)
    
    // Router
    const history = useHistory()
    // Local state
    let [form, setForm] = useState({
        userEmail: "phsang49@gmail.com",
        userPassword: "phsang49@gmail.com"
    })
    if(isAuthenticated){
        history.push("/")
    }
    const {userEmail, userPassword} = form

    const onChangeForm = event => 
    setForm({ ...form, [event.target.name]: event.target.value})

    const login = async event => {
        event.preventDefault()
        try {
            const loginData = await loginUser(form)
            if(loginData.success){
                history.go(0)
            }
            else {
                alert("Incorrect Email/ Password")
            }
        } catch (error) {
            console.log("FinTEST" + error.message)
        }
               
    }
    
    return (
        <>
        <div className="form-container">
            <div className="form-form">
                <div className="form-form-wrap">
                    <div className="form-container">
                        <div className="form-content">
                            <h1 className=""><span className="brand-name">Asia Park</span></h1>
                            <form className="text-left" onSubmit={login}>
                            <div class="form">
                                <div id="username-field" class="field-wrapper input">
                                    <label for="username">EMAIL</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    <input value={userEmail} name="userEmail" onChange={onChangeForm} required  type="email" class="form-control" placeholder="Admin@park.com"/>
                                </div>

                                <div id="password-field" class="field-wrapper input mb-2">
                                    <div class="d-flex justify-content-between">
                                        <label for="password">PASSWORD</label>
                                        <a href class="forgot-pass-link">Forgot Password?</a>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                    <input value={userPassword} name="userPassword" onChange={onChangeForm} required  type="password" class="form-control" placeholder="Password"/>
                                </div>
                                <div class="d-sm-flex justify-content-between">
                                    <div class="field-wrapper">
                                        <button type="submit" class="btn btn-primary" value="">Log In</button>
                                    </div>
                                </div>
                            </div>
                            </form>
                        </div>    
                    </div>
                    
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default Login
