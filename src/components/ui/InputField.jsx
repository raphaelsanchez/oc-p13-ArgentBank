import PropTypes from 'prop-types'

/**
 * InputField component.
 *
 * @component
 * @param {string} id - The id of the input field.
 * @param {string} name - The name of the input field.
 * @param {string} placeholder - The placeholder text for the input field.
 * @param {string} value - The value of the input field.
 * @param {function} setValue - The function to set the value of the input field.
 * @param {string} [className] - The additional class name for styling.
 *
 * @returns {JSX.Element} - The rendered InputField component.
 */
export const InputField = ({
    id,
    type,
    name,
    placeholder,
    value,
    setValue,
    label,
    labelClassName,
}) => (
    <div className="input-wrapper">
        <label htmlFor={id} className={`label ${labelClassName}`}>
            {label || placeholder}
        </label>
        <input
            type={type || 'text'}
            className="input"
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e)}
        />
    </div>
)

// propTypes
InputField.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    setValue: PropTypes.func.isRequired,
    label: PropTypes.string,
    labelClassName: PropTypes.string,
}
