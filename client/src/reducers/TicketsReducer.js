export const TicketsReducer = (state, action)=>{
    const {type, payload} = action

    switch (type) {
        case "TICKETS_LOADED_SUCCESS":
            
            return {
                ...state,
                tickets: payload,
                ticketsLoading: false
            }
        case "TICKETS_LOADED_FAIL":
        
            return {
                ...state,
                tickets: [],
                ticketsLoading: false
            }
        case "CREATE_TICKETS_SUCCESS":

            return {
                ...state,
                tickets: [payload, ...state.tickets],
                ticketsLoading: false
            }
        case "TICKET_LOADED_SUCCESS":
        
            return {
                state,
                ticket: payload,
                ticketLoading: false
            }
        case "TICKET_LOADED_FAIL":
    
            return {
                ticket: [],
                ticketLoading: false
            }
        default:
            return state
    }
}