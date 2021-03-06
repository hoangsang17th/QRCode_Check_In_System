export const UsersReducer = (state, action)=>{
    const {type, payload} = action

    switch (type) {
        case "USERS_LOADED_SUCCESS":
            
            return {
                ...state,
                users: payload,
                usersLoading: false
            }
        case "USERS_LOADED_FAIL":
        
            return {
                ...state,
                users: [],
                usersLoading: false
            }
        case "CREATE_USERS_SUCCESS":

            return {
                ...state,
                users: [payload, ...state.users],
                usersLoading: false
            }
        default:
            return state
    }
}