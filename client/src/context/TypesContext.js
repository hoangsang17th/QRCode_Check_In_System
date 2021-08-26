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
    // Port context data
    const typesContextData = {typesState, getTypes}
    return (
        <TypesContext.Provider value = {typesContextData}>
            {children}
        </TypesContext.Provider>
    )
}
export default TypesContextProvider