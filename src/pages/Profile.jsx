import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { accountData } from '../__mocks__/accountData'
import AccountSection from '../components/AccountSection'
import Button from '../components/ui/Button'
import { InputField } from '../components/ui/InputField'
import { updateUserProfile } from '../store/authThunks'

/**
 * Profile component - Allows the user to view and edit their profile
 * @component
 */
export default function Profile() {
    const dispatch = useDispatch()

    // Get the values from the Redux store
    const reduxFirstName = useSelector((state) => state.auth.firstName)
    const reduxLastName = useSelector((state) => state.auth.lastName)

    // Local state for form visibility and form inputs
    const [showEditForm, setShowEditForm] = useState(false)
    const [firstName, setFirstName] = useState(reduxFirstName || '')
    const [lastName, setLastName] = useState(reduxLastName || '')

    // Update local state when the values in the Redux store change
    useEffect(() => {
        setFirstName(reduxFirstName)
        setLastName(reduxLastName)
    }, [reduxFirstName, reduxLastName])

    /**
     * Toggles the edit form visibility.
     * @function toggleEditForm
     * @returns {void}
     */
    const toggleEditForm = useCallback(
        () => setShowEditForm(!showEditForm),
        [showEditForm]
    )

    /**
     * Handle form submission - dispatch the updateUserProfile action
     * and hide the form
     * @param {Event} e - The form submit event
     * @returns {void}
     */
    const handleSubmitForm = useCallback(
        (e) => {
            e.preventDefault()
            dispatch(updateUserProfile({ firstName, lastName }))
            setShowEditForm(false)
        },
        [dispatch, firstName, lastName]
    )

    return (
        <main className="main bg-dark">
            <header className="header">
                {/* Show the edit form if showEditForm is true, otherwise show the welcome message */}
                {showEditForm ? (
                    <h1>Welcome back</h1>
                ) : (
                    <>
                        <h1>
                            Welcome back{' '}
                            <span className="userName">
                                {firstName} {lastName}
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

                {/* The edit form */}
                {showEditForm && (
                    <form className="edit-form" onSubmit={handleSubmitForm}>
                        <InputField
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            value={firstName}
                            setValue={(e) => setFirstName(e.target.value)}
                            labelClassName="sr-only"
                        />
                        <InputField
                            id="lastName"
                            name="lastName"
                            placeholder="Last Name"
                            value={lastName}
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

            {/* Render the account data */}
            {accountData &&
                accountData.map((account, index) => (
                    <AccountSection key={index} account={account} />
                ))}
        </main>
    )
}
