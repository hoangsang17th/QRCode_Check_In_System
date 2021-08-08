import { createContext, useReducer } from "react";
import axios from "axios";
import {AuthReducer} from "../reducers/AuthReducer";
import {apiUrl, LOCAL_STORAGE_TOKEN_NAME} from "./constants";

export const AuthContext = createContext()
const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(AuthReducer, {
        authLoading: true,
        isAuthenticated: false,
        authUser: null
    })

    const loginUser = async userForm => {
        try {
            const response = axios.post(`${apiUrl}/auth/login`)
            if((await response).data.success){
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
                return response.data
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
}