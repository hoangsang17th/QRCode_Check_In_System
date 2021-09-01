import { createContext, useReducer } from "react";
import { apiUrl } from "./constants";
import axios from "axios";
import { TicketsReducer } from "../reducers/TicketsReducer";

export const TicketsContext = createContext()

const TicketsContextProvider = ({children}) => {
    // State
    const [ticketState, dispath] = useReducer(TicketsReducer, {
        tickets: [],
        ticket: [],
        ticketsLoading: true
    })
    // Get all Tickets
    const getTicketsStaff = async() => {
        try {
            const response = await axios.get(`${apiUrl}/Tickets/viewStaff`)
            if(response.data.success){
                dispath({type: "TICKETS_LOADED_SUCCESS", payload: response.data.viewTicket})
            }
        } catch (error) {
            dispath({type: "TICKETS_LOADED_FAIL"})
        }
    }

    const getTicketsManager = async() => {
        try {
            const response = await axios.get(`${apiUrl}/Tickets/viewManager`)
            if(response.data.success){
                dispath({type: "TICKETS_LOADED_SUCCESS", payload: response.data.viewTicket})
            }
        } catch (error) {
            dispath({type: "TICKETS_LOADED_FAIL"})
        }
    }
    const createTicket = async newTicket => {
        try {
            
            const response = await axios.post(`${apiUrl}/Tickets/create`, newTicket)
            if(response.data.success){
                dispath({type: "CREATE_TICKETS_SUCCESS", payload: response.data.newTicket})
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
    const getTicketById = async ticketId => {
        try {
            const response = await axios.get(`${apiUrl}/Tickets/view/${ticketId}`)
            if(response.data.success){
                dispath({type: "TICKET_LOADED_SUCCESS", payload: response.data.viewTicket})
            }
        } catch (error) {
            dispath({type: "TICKET_LOADED_FAIL"})
        }
    }
    // Port context data
    const ticketContextData = {ticketState, getTicketsStaff, getTicketsManager, createTicket, getTicketById}
    return (
        <TicketsContext.Provider value = {ticketContextData}>
            {children}
        </TicketsContext.Provider>
    )
}
export default TicketsContextProvider