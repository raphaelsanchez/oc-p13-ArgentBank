import PropTypes from 'prop-types'

export default function AccountSection({ account }) {
    const { title, amount, description } = account
    return (
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">{title}</h3>
                <p className="account-amount">{amount}</p>
                <p className="account-amount-description">{description}</p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="transaction-button">View transaction</button>
            </div>
        </section>
    )
}

// propTypes
AccountSection.propTypes = {
    account: PropTypes.shape({
        title: PropTypes.string.isRequired,
        amount: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }),
}
