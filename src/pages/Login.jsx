import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import { InputCheckbox } from '../components/ui/InputCheckbox'
import { InputField } from '../components/ui/InputField'
import { loginUser } from '../store/userSlice'
import { persistUserInStorage } from '../utils'

/**
 * SignIn page.
 * @returns {JSX.Element} The SignIn component.
 */
export default function Login() {
    // Redux state
    const dispatch = useDispatch()
    const token = useSelector((state) => state.user.token)

    // Local state
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState('')

    // React Router hook
    const navigate = useNavigate()

    // Redirect the user to the profile page if they are already logged in
    useEffect(() => {
        if (token) {
            navigate('/profile')
        }
    }, [token, navigate])

    /**
     * Handles the form submission.
     *
     * @param {Event} e - The form submit event.
     * @returns {void}
     */
    const handleFormSubmit = (e) => {
        e.preventDefault()

        // Fake login logic
        const user = {
            firstname: username,
            rememberMe,
            token: 'fakeToken123',
        }

        // Store the user in localStorage or sessionStorage depending on rememberMe
        const storage = rememberMe ? localStorage : sessionStorage
        persistUserInStorage(storage, user)

        // Fake error handling
        if (!username || !password) {
            setError('Please fill in all fields')
            return
        }

        // Dispatch the action to update the user
        dispatch(loginUser(user))
    }

    // return the JSX for the component
    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleFormSubmit}>
                    <InputField
                        id="username"
                        name="username"
                        label="Username"
                        setValue={(e) => setUsername(e.target.value)}
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
                        Sign In
                    </Button>
                </form>
            </section>
        </main>
    )
}
