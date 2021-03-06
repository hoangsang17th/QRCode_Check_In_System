export const TypesReducer = (state, action)=>{
    const {type, payload} = action

    switch (type) {
        case "TYPES_LOADED_SUCCESS":
            
            return {
                ...state,
                types: payload,
                typesLoading: false
            }
        case "TYPES_LOADED_FAIL":
        
            return {
                ...state,
                types: [],
                typesLoading: false
            }
        case "CREATE_TYPES_SUCCESS":

            return {
                ...state,
                types: [payload, ...state.types],
                typesLoading: false
            }
        case "TYPE_LOADED_SUCCESS":
        
            return {
                typess: payload,
                typeLoading: false
            }
        case "TYPE_LOADED_FAIL":
    
            return {
                typess: [],
                typeLoading: false
            }
        default:
            return state
    }
}