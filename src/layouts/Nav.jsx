import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import SignInOut from '../components/SignInOut'

/**
 * Nav component.
 * @returns {JSX.Element} The Nav component.
 */
export default function Nav() {
    // Redux state
    const user = useSelector((state) => state.user)

    // return the JSX for the component
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
                {/* TODO: Dynamiser cette partie */}
                {user && user.token && (
                    <NavLink className="main-nav-item" to="/profile">
                        <i className="fa fa-user-circle"></i>
                        <span>{user.firstname}</span>
                    </NavLink>
                )}

                <SignInOut />
            </div>
        </nav>
    )
}
