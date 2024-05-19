import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logoutUser } from '../store/userSlice'
import { removeUserFromStorage } from '../utils'

export default function SignInOut() {
    // Redux state
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    /**
     * Removes the user from both localStorage and sessionStorage.
     */
    const removeUserFromAllStorages = () =>
        [localStorage, sessionStorage].forEach(removeUserFromStorage)

    /**
     * Handles the sign out action.
     */
    const handleSignOut = () => {
        // remove the user from localStorage and sessionStorage
        removeUserFromAllStorages()

        // dispatch the logout action
        dispatch(logoutUser())
    }

    return (
        <>
            {user && user.token ? (
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
