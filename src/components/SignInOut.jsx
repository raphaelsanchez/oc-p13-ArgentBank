import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../store/authSlice'

export default function SignInOut() {
    // Redux state
    const token = useSelector((state) => state.auth.token)
    const dispatch = useDispatch()

    /**
     * Handles the sign out action.
     */
    const handleSignOut = () => {
        // dispatch the logout action
        dispatch(logout())
    }

    return (
        <>
            {token ? (
                <NavLink
                    className="main-nav-item"
                    to="/"
                    onClick={handleSignOut}
                >
                    <i className="fa fa-sign-out"></i>
                    <span>Sign Out</span>
                </NavLink>
            ) : (
                <NavLink className="main-nav-item" to="/login">
                    <i className="fa fa-user-circle"></i>
                    <span>Sign In</span>
                </NavLink>
            )}
        </>
    )
}
