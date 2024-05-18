import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './layouts/App'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
/**
 * Router component. Defines the application routes.
 *
 * @returns {JSX.Element} The Router component.
 */
export function Router() {
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
                    element: <Profile />,
                },
            ],
        },
    ])
    return <RouterProvider router={router} />
}
