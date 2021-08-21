import { useContext } from 'react'
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
function Login() {
    // Context
    const {authState: {isAuthenticated}} = useContext(AuthContext)
    if(isAuthenticated){
        return <Redirect to="/Tickets" />
    }
    else {
        return <Redirect to="/Login" />
    }
}

export default Login
