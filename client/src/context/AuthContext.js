import { React, createContext, useReducer, useEffect } from "react";
import axios from "axios";
import {AuthReducer} from "../reducers/AuthReducer";
import {apiUrl, LOCAL_STORAGE_TOKEN_NAME} from "./constants";
import setAuthToken from "../utils/setAuthToken"

export const AuthContext = createContext()
const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(AuthReducer, {
        isAuthenticated: false,
        authUser: null
    })


    // Authetication user
    const loadUser = async () => {
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const res = await axios.get(`${apiUrl}/Auth/`)
            if(res.data.success){
                dispatch({type: "SET_AUTH", payload: {isAuthenticated: true, user: res.data.user}})
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({type: "SET_AUTH", payload: {isAuthenticated: false, user: null}})
        }
    }

    useEffect(() => loadUser(), [])

    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/Auth/login`, userForm)
            if(response.data.success){
                console.log("Hello")
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME, 
                    response.data.accessToken
                )
                return response.data
            } else {
                alert("Your account has been locked. Please contact the manager for more information.")
            }
        } catch (error) {
            if(error.response.data){
                return error.response.data
            }
            else {
                return {success: false, message: error.message}
            }
        }
    }
    const logoutUser = () => {
        localStorage.removeItem(
            LOCAL_STORAGE_TOKEN_NAME
        )
        dispatch({type: "SET_AUTH", payload: {isAuthenticated: false, user: null}})
    }
    const AuthContextData = {loginUser, authState, logoutUser}

    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider