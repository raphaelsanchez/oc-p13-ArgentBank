import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import '../assets/styles/app.css'
import Footer from '../layouts/Footer'
import Nav from '../layouts/Nav'
import { refetchUserStatus } from '../store/authThunks'

/**
 * The main component for the application.
 * Renders the navigation bar, the main content, and the footer.
 *
 * @returns {JSX.Element} The rendered App component.
 */
export default function App() {
    const dispatch = useDispatch()

    /**
     * Refetch the user status when the component mounts.
     * This will check if the user is still authenticated and update the state accordingly.
     */
    useEffect(() => {
        dispatch(refetchUserStatus())
    }, [dispatch])

    return (
        <>
            <Nav />
            <Outlet />
            <Footer />
        </>
    )
}
