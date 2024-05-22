import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'

/**
 * The Redux store configuration
 * @constant
 * @type {Object}
 */
const store = configureStore({
    reducer: {
        auth: authReducer,
    },
})

// Export the configured Redux store
export default store
