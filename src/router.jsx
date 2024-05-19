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
    // Redux state
    const user = useSelector((state) => state.user)

    // Check if the user is authenticated to secure the profile page
    const isAuthenticated = user && user.token

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
                    element: isAuthenticated ? (
                        <Profile />
                    ) : (
                        <Navigate to="/login" />
                    ),
                },
            ],
        },
    ])
    return <RouterProvider router={router} />
}
