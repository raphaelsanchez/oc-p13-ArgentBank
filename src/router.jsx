import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './layouts/App'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import User from './pages/User'
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
                    path: '/sign-in',
                    element: <SignIn />,
                },
                {
                    path: '/user',
                    element: <User />,
                },
            ],
        },
    ])
    return <RouterProvider router={router} />
}
