import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import SignInOut from '../components/SignInOut'

/**
 * Nav component - Displays the main navigation bar
 * @component
 * @returns {JSX.Element} The rendered Nav component
 */
export default function Nav() {
    // Get the current user's token and first name from the Redux store
    const token = useSelector((state) => state.auth.token)
    const firstName = useSelector((state) => state.auth.firstName)

    // Return the JSX for the Nav component
    return (
        <nav className="main-nav">
            <NavLink className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src="argentBankLogo.png"
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </NavLink>
            <div>
                {/* If the user is logged in (i.e., the token and firstName are truthy),
                    show a link to the profile page with the user's first name */}
                {token && firstName && (
                    <NavLink className="main-nav-item" to="/profile">
                        <i className="fa fa-user-circle"></i>
                        <span>{firstName}</span>
                    </NavLink>
                )}

                {/* The SignInOut component handles the sign in/out functionality */}
                <SignInOut />
            </div>
        </nav>
    )
}
