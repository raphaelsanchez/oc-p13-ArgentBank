import { Outlet } from 'react-router-dom'
import '../assets/styles/app.css'
import Nav from '../layouts/Nav'
import Footer from '../layouts/Footer'

export default function App() {
    return (
        <>
            <Nav />
            <Outlet />
            <Footer />
        </>
    )
}
