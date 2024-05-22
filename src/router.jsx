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
    // Pricate route
    const PrivateRoute = ({ children }) => {
        const token = useSelector((state) => state.auth.token)
        return token ? children : <Navigate to="/login" />
    }

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
                    element: <Login />,
                },
                {
                    path: '/profile',
                    element: (
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    ),
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
