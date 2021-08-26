export const PageReducer = (state, action)=>{
    const {type, payload} = action

    switch (type) {
        case "PAGE_LOADED_SUCCESS":
            
            return {
                ...state,
                page: payload,
                pageLoading: false
            }
        case "PAGE_LOADED_FAIL":
        
            return {
                ...state,
                page: [],
                pageLoading: false
            }
    
        default:
            return state
    }
}