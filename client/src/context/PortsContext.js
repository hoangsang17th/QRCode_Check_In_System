import { createContext, useReducer } from "react";
import { apiUrl } from "./constants";
import axios from "axios";
import { PortsReducer } from "../reducers/PortsReducer";

export const PortsContext = createContext()

const PortsContextProvider = ({children}) => {
    // State
    const [portState, dispath] = useReducer(PortsReducer, {
        ports: [],
        portsLoading: true
    })
    // Get all ports
    const getPorts = async() => {
        try {
            const response = await axios.get(`${apiUrl}/Ports/view`)
            if(response.data.success){
                dispath({type: "PORTS_LOADED_SUCCESS", payload: response.data.viewPorts})
            }
        } catch (error) {
            dispath({type: "PORTS_LOADED_FAIL"})
        }
    }
    const createPort = async newPort => {
        try {
            
            const response = await axios.post(`${apiUrl}/Ports/create`, newPort)
            if(response.data.success){
                dispath({type: "CREATE_PORTS_SUCCESS", payload: response.data.newPort})
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
    const portContextData = {portState, getPorts, createPort}
    return (
        <PortsContext.Provider value = {portContextData}>
            {children}
        </PortsContext.Provider>
    )
}
export default PortsContextProvider