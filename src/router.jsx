import PropTypes from 'prop-types'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './layouts/App'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'

import { useSelector } from 'react-redux'
/**
 * Router component. Defines the application routes.
 *
 * @returns {JSX.Element} The Router component.
 */
export function Router() {
    const token =
        useSelector((state) => state.auth.token) ||
        localStorage.getItem('token') ||
        null

    // Create the router
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: '/login',
                    element: token ? <Navigate to="/profile" /> : <Login />,
                },
                {
                    path: '/profile',
                    element: token ? <Profile /> : <Navigate to="/login" />,
                },
            ],
        },
    ])
    return <RouterProvider router={router} />
}

// Props Validation
Router.propTypes = {
    children: PropTypes.node,
}
