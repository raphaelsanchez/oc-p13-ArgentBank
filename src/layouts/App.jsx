import { Outlet } from 'react-router-dom'
import '../assets/styles/app.css'
import Footer from '../layouts/Footer'
import Nav from '../layouts/Nav'

/**
 * The main component for the application.
 * Renders the navigation bar, the main content, and the footer.
 *
 * @returns {JSX.Element} The rendered App component.
 */
export default function App() {
    return (
        <>
            <Nav />
            <Outlet />
            <Footer />
        </>
    )
}
