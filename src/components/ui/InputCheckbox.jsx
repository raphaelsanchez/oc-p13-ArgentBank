import PropTypes from 'prop-types'

/**
 * Checkbox input component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.id - The id of the checkbox input.
 * @param {function} props.onChange - The function to be called when the checkbox value changes.
 * @param {string} props.label - The label for the checkbox input.
 * @returns {JSX.Element} The checkbox input component.
 */
export const InputCheckbox = ({ id, onChange, label }) => {
    return (
        <div className="input-remember">
            <input
                type="checkbox"
                id={id}
                onChange={(e) => onChange(e.target.checked)}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

// propTypes
InputCheckbox.propTypes = {
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
}
