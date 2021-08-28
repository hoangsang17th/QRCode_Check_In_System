import { createContext, useReducer } from "react";
import { apiUrl } from "./constants";
import axios from "axios";
import { UsersReducer } from "../reducers/UsersReducer";

export const UsersContext = createContext()

const UsersContextProvider = ({children}) => {
    // State
    const [userState, dispath] = useReducer(UsersReducer, {
        users: [],
        usersLoading: true
    })
    // Get all users
    const getUsers = async() => {
        try {
            const response = await axios.get(`${apiUrl}/Users/view`)
            if(response.data.success){
                dispath({type: "USERS_LOADED_SUCCESS", payload: response.data.viewUsers})
            }
        } catch (error) {
            dispath({type: "USERS_LOADED_FAIL"})
        }
    } 
    const createUser = async newUser => {
        try {
            
            const response = await axios.post(`${apiUrl}/Users/create`, newUser)
            if(response.data.success){
                dispath({type: "CREATE_USERS_SUCCESS", payload: response.data.newUser})
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
    // user context data
    const userContextData = {userState, getUsers, createUser}
    return (
        <UsersContext.Provider value = {userContextData}>
            {children}
        </UsersContext.Provider>
    )
}
export default UsersContextProvider