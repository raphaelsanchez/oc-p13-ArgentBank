/**
 * Nav component.
 * @returns {JSX.Element} The Nav component.
 */
export default function Nav() {
    const isAuthenticated = true
    const user = {
        firstName: 'Tony',
        lastName: 'Stark',
    }
    return (
        <nav className="main-nav">
            <a className="main-nav-logo" href="/">
                <img
                    className="main-nav-logo-image"
                    src="argentBankLogo.png"
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </a>
            <div>
                {/* TODO: Dynamiser cette partie */}
                {isAuthenticated && user && (
                    <a className="main-nav-item" href="/user">
                        <i className="fa fa-user-circle"></i>
                        <span>{user.firstName}</span>
                    </a>
                )}

                {/* TODO: Créer un composant séparé ? */}
                {isAuthenticated ? (
                    <a className="main-nav-item" href="/sign-out">
                        <i className="fa fa-sign-out"></i>
                        <span>Sign Out</span>
                    </a>
                ) : (
                    <a className="main-nav-item" href="/sign-in">
                        <i className="fa fa-user-circle"></i>
                        <span>Sign In</span>
                    </a>
                )}
            </div>
        </nav>
    )
}
