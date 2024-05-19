import PropTypes from 'prop-types'

/**
 * Button component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to display on the button.
 * @param {string} props.className - The CSS class name for the button.
 *
 * @returns {JSX.Element} The rendered Button component.
 */
export default function Button({
    type = 'button',
    className,
    onClick,
    children,
}) {
    return (
        <button type={type} className={className} onClick={onClick}>
            {children}
        </button>
    )
}

// propTypes
Button.propTypes = {
    type: PropTypes.string,
    children: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
}
