import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { accountData } from '../__mocks__/accountData'
import AccountSection from '../components/AccountSection'
import Button from '../components/ui/Button'
import { InputField } from '../components/ui/InputField'
import { updateUser } from '../store/userSlice'
import { persistUserInStorage } from '../utils'

/**
 * User page.
 * @returns {JSX.Element} The User component.
 */
export default function Profile() {
    // Redux state
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    // Local state
    const [showEditForm, setShowEditForm] = useState(false)
    const [firstname, setFirstname] = useState(user.firstname || '')
    const [lastname, setLastName] = useState(user.lastname || '')

    /**
     * Toggles the edit form visibility.
     * @function toggleEditForm
     * @returns {void}
     */
    const toggleEditForm = useCallback(
        () => setShowEditForm(!showEditForm),
        [showEditForm]
    )

    const getStorageType = () => {
        return localStorage.getItem('token') ? localStorage : sessionStorage
    }

    /**
     * Handles the form submission.
     * @function handleSubmitForm
     * @param {Event} e - The form event.
     * @returns {void}
     */
    const handleSubmitForm = useCallback(
        (e) => {
            e.preventDefault()
            // Dispatch the action to update the user
            dispatch(updateUser({ firstname, lastname }))

            // Update the local storage
            const storage = getStorageType()
            persistUserInStorage(storage, {
                ...user,
                firstname,
                lastname,
            })

            // Close the form
            toggleEditForm()
        },
        [dispatch, firstname, lastname, toggleEditForm, user]
    )

    // Render the component
    return (
        <main className="main bg-dark">
            <header className="header">
                {showEditForm ? (
                    <h1>Welcome back</h1>
                ) : (
                    <>
                        <h1>
                            Welcome back{' '}
                            <span className="userName">
                                {firstname} {lastname}
                            </span>
                        </h1>
                        <Button
                            type="submit"
                            className="edit-button"
                            onClick={toggleEditForm}
                        >
                            Edit Name
                        </Button>
                    </>
                )}

                {showEditForm && (
                    <form className="edit-form" onSubmit={handleSubmitForm}>
                        <InputField
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            value={firstname}
                            setValue={(e) => setFirstname(e.target.value)}
                            labelClassName="sr-only"
                        />
                        <InputField
                            id="lastName"
                            name="lastName"
                            placeholder="Last Name"
                            value={lastname}
                            setValue={(e) => setLastName(e.target.value)}
                            labelClassName="sr-only"
                        />
                        <Button type="submit" className="save-button">
                            Save
                        </Button>
                        <Button
                            className="cancel-button"
                            onClick={toggleEditForm}
                        >
                            Cancel
                        </Button>
                    </form>
                )}
            </header>
            <h2 className="sr-only">Accounts</h2>

            {accountData &&
                accountData.map((account, index) => (
                    <AccountSection key={index} account={account} />
                ))}
        </main>
    )
}
