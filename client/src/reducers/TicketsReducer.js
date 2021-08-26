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
    
        default:
            return state
    }
}