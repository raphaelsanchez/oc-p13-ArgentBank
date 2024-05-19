/**
 * Stores user information in either localStorage or sessionStorage based on the rememberMe flag.
 * @param {Object} user - The user object containing the user information.
 * @param {boolean} rememberMe - Flag indicating whether to store the information in localStorage (true) or sessionStorage (false).
 */
export const persistUserInStorage = (storage, user) =>
    ['firstname', 'lastname', 'token'].forEach((key) => {
        storage.setItem(key, user[key])
    })

// Remove the user information from the storage
export const removeUserFromStorage = (storage) =>
    ['firstname', 'lastname', 'token'].forEach((key) => {
        storage.removeItem(key)
    })
