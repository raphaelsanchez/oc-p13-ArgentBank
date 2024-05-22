import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { accountData } from '../__mocks__/accountData'
import AccountSection from '../components/AccountSection'
import Button from '../components/ui/Button'
import { InputField } from '../components/ui/InputField'

/**
 * Profile component - Allows the user to view and edit their profile
 * @component
 */
export default function Profile() {
    // Get the current user's first and last name from the Redux store
    const firstname = useSelector((state) => state.auth.firstName)
    const lastname = useSelector((state) => state.auth.lastName)

    // Local state for form visibility and form inputs
    const [showEditForm, setShowEditForm] = useState(false)
    const [firstName, setFirstName] = useState(firstname || '')
    const [lastName, setLastName] = useState(lastname || '')

    // Toggle the visibility of the edit form
    const toggleEditForm = useCallback(
        () => setShowEditForm(!showEditForm),
        [showEditForm]
    )

    /**
     * Handle form submission - dispatch the updateUserProfile action
     * and hide the form
     * @param {Event} e - The form submit event
     */
    const handleSubmitForm = useCallback((e) => {
        e.preventDefault()
        setShowEditForm(false)
    }, [])

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

                {/* The edit form */}
                {showEditForm && (
                    <form className="edit-form" onSubmit={handleSubmitForm}>
                        <InputField
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            value={firstname}
                            setValue={(e) => setFirstName(e.target.value)}
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

            {/* Render the account data */}
            {accountData &&
                accountData.map((account, index) => (
                    <AccountSection key={index} account={account} />
                ))}
        </main>
    )
}
