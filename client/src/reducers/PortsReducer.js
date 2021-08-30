export const PortsReducer = (state, action)=>{
    const {type, payload} = action

    switch (type) {
        case "PORTS_LOADED_SUCCESS":
            
            return {
                ...state,
                ports: payload,
                portsLoading: false
            }
        case "PORTS_LOADED_FAIL":
        
            return {
                ...state,
                ports: [],
                portsLoading: false
            }
        case "CREATE_PORTS_SUCCESS":
    
            return {
                ...state,
                ports: [payload, ...state.ports],
                portsLoading: false
            }
        case "DELETE_PORT_SUCCESS":
    
            return {
                ...state,
                ports: state.ports.filter(port => port._id !== payload)
            }
        default:
            return state
    }
}