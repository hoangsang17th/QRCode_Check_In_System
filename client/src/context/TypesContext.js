import { createContext, useReducer } from "react";
import { apiUrl } from "./constants";
import axios from "axios";
import { TypesReducer } from "../reducers/TypesReducer";

export const TypesContext = createContext()

const TypesContextProvider = ({children}) => {
    // State
    const [typesState, dispath] = useReducer(TypesReducer, {
        types: [],
        typesLoading: true
    })
    // Get all Typess
    const getTypes = async() => {
        try {
            const response = await axios.get(`${apiUrl}/Types/view`)
            if(response.data.success){
                dispath({type: "TYPES_LOADED_SUCCESS", payload: response.data.viewTypes})
            }
        } catch (error) {
            dispath({type: "TYPES_LOADED_FAIL"})
        }
    }
    const createType = async newType => {
        try {
            
            const response = await axios.post(`${apiUrl}/Types/create`, newType)
            if(response.data.success){
                dispath({type: "CREATE_TYPES_SUCCESS", payload: response.data.newType})
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
    // Port context data
    const typesContextData = {typesState, getTypes, createType}
    return (
        <TypesContext.Provider value = {typesContextData}>
            {children}
        </TypesContext.Provider>
    )
}
export default TypesContextProvider