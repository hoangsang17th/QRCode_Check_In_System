import HeaderBar from '../components/HeaderBar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import React, {useContext, useState} from 'react'
import {AuthContext} from "../context/AuthContext"
import { useHistory } from 'react-router-dom';
var moment = require('moment')
function Profile(){
    const history = useHistory()
    const {authState: { user }, updateUser} = useContext(AuthContext)
    const [updateProfile, setUpdateProfile] = useState({
        userEmail: user.userEmail,
        userName: user.userName,
        userPosition: user.userPosition,
        userBirthday: moment(user.userBirthday).format("YYYY-MM-DD"),
        userAddress: user.userAddress,
        userPassword: "",
        userNewPassword: "",
    })
    const {
        userEmail, 
        userName, 
        userPosition, 
        userBirthday, 
        userAddress, 
        userPassword,
        userNewPassword} = updateProfile
    
    const onChangeForm = event => 
    setUpdateProfile({ ...updateProfile, [event.target.name]: event.target.value})
    const profileForm = async event => {
        event.preventDefault()
        if(userName === "" ||userBirthday === "" ||userAddress === "" ||userPassword === ""){
            alert("You can just leave the new password field blank!")
        }
        try {
            const profileData = await updateUser(updateProfile)
            
            if(profileData.success){
                alert("User update success")
                setUpdateProfile({
                    userEmail: user.userEmail,
                    userName: user.userName,
                    userPosition: user.userPosition,
                    userBirthday: moment(user.userBirthday).format("YYYY-MM-DD"),
                    userAddress: user.userAddress,
                    userPassword: "",
                    userNewPassword: "",
                })
                alert("Please LogIn again!")
                history.go(0)
            }
            else {
                alert("Incorrect Password")
            }
        } catch (error) {
            console.log("FinTEST" + error.message)
        }
    }

    return (
        <div>
        <HeaderBar />
            <div className="main-container" id="container">
            <div className="overlay"></div>
            <TopBar />
            <div id="content" className="main-content">
            <div className="layout-px-spacing">
                <div className="row layout-top-spacing" id="no-print">
                    <div className="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                        <div className="widget-content widget-content-area br-6">
                                <div className="info">
                                    <h6 className="H5 text-uppercase text-center mb-2 pb-2">General Information</h6>
                                    <div className="row">
                                        <div className="col-12 col-md-8 mx-auto">
                                            <div className="row">
                                                <div className="col-12 mt-md-0 mt-4">
                                                    <div className="form">
                                                        <form onSubmit={profileForm}>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <label for="fullName">Email*</label>
                                                                    <input value={userEmail} type="email" name="userEmail" className="form-control mb-4" disabled/>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <label for="fullName">Full Name*</label>
                                                                <input value={userName} onChange={onChangeForm} type="text" name="userName" className="form-control mb-4" placeholder="Full Name" required/>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <label for="fullName">Position*</label>
                                                                    <input value={userPosition} type="text" name="userPosition" className="form-control mb-4" disabled/>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <label for="fullName">Birthday*</label>
                                                                <input value={userBirthday} onChange={onChangeForm} type="date" name="userBirthday" className="form-control mb-4" />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <div className="form-group">
                                                                    <label for="fullName">Address*</label>
                                                                    <textarea value={userAddress} onChange={onChangeForm} row="3" type="text" name="userAddress" className="form-control mb-4" placeholder="Your Address" required/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <label for="fullName">Current Password*</label>
                                                                    <input value={userPassword} onChange={onChangeForm} type="password" name="userPassword" className="form-control mb-4" placeholder="Your Password" required/>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <label for="fullName">New Password</label>
                                                                <input value={userNewPassword} onChange={onChangeForm} type="password" name="userNewPassword" className="form-control mb-4" placeholder="New Password"/>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <div className="form-group">
                                                                    <input type="submit" className="form-control mb-4 btn btn-outline-primary"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            </div>
        </div>
    </div>
    )
}

export default Profile
