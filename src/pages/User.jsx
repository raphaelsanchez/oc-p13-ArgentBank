import { useCallback, useState } from 'react'

/**
 * User page.
 * @returns {JSX.Element} The User component.
 */
export default function User() {
    const [showEditForm, setShowEditForm] = useState(false)

    /**
     * Toggles the edit form visibility.
     * @function toggleEditForm
     * @returns {void}
     */
    const toggleEditForm = useCallback(
        () => setShowEditForm(!showEditForm),
        [showEditForm]
    )

    return (
        <main className="main bg-dark">
            <header className="header">
                {showEditForm ? (
                    <h1>Welcome back</h1>
                ) : (
                    <>
                        <h1>
                            Welcome back{' '}
                            <span className="userName">Tony Stark!</span>
                        </h1>

                        <button
                            className="edit-button"
                            onClick={toggleEditForm}
                        >
                            Edit Name
                        </button>
                    </>
                )}

                {showEditForm && (
                    <form className="edit-form">
                        <div>
                            <label htmlFor="firstName" className="sr-only">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="First Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="sr-only">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Last Name"
                            />
                        </div>

                        <button type="submit" className="save-button">
                            Save
                        </button>

                        <button
                            className="cancel-button"
                            onClick={toggleEditForm}
                        >
                            Cancel
                        </button>
                    </form>
                )}
            </header>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">
                        Argent Bank Checking (x8349)
                    </h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">
                        Available Balance
                    </p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">
                        View transactions
                    </button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">
                        Argent Bank Savings (x6712)
                    </h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">
                        Available Balance
                    </p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">
                        View transactions
                    </button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">
                        Argent Bank Credit Card (x8349)
                    </h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">
                        Current Balance
                    </p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">
                        View transactions
                    </button>
                </div>
            </section>
        </main>
    )
}
