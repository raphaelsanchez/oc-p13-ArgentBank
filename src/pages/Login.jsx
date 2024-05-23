import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import { InputCheckbox } from '../components/ui/InputCheckbox'
import { InputField } from '../components/ui/InputField'
import { fetchUserProfile, loginUser } from '../store/authSlice'

/**
 * Login component - Allows the user to log in
 * @component
 * @returns {JSX.Element} The rendered Login component
 */
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Get the loading and error state from the Redux store
    const { loading, error } = useSelector((state) => state.auth || {})

    // Local state for form inputs
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    /**
     * Handle form submission - dispatch the loginUser action
     * and navigate to the profile page if successful
     * @param {Event} e - The form submit event
     */
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser({ email, password, rememberMe })).then((result) => {
            if (result.type.endsWith('fulfilled')) {
                // Store the token in local or session storage based on the rememberMe checkbox
                rememberMe
                    ? localStorage.setItem('token', result.payload.body.token)
                    : sessionStorage.setItem('token', result.payload.body.token)

                dispatch(fetchUserProfile())
                navigate('/profile')
            }
        })
    }

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                {error && <p className="error-message">{error.message}</p>}
                <form onSubmit={handleSubmit}>
                    <InputField
                        id="username"
                        name="username"
                        type="email"
                        label="Username"
                        setValue={(e) => setEmail(e.target.value)}
                    />
                    <InputField
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        setValue={(e) => setPassword(e.target.value)}
                    />
                    <InputCheckbox
                        id="rememberMe"
                        label="Remember Me"
                        onChange={setRememberMe}
                    />
                    <Button type="submit" className="sign-in-button">
                        {loading ? 'Loading...' : 'Sign In'}
                    </Button>
                </form>
            </section>
        </main>
    )
}

export default Login
