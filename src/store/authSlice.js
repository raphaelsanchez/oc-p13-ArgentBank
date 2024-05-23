import { createSlice } from '@reduxjs/toolkit'
import { authBuilders } from './authBuilders'

/**
 * Slice for handling authentication state
 * @constant
 * @type {Object}
 */
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        firstName: null,
        lastName: null,
        email: null,
        rememberMe: false,
        token: null,
        loading: false,
        error: null,
    },
    reducers: {
        /**
         * Reducer for logging out
         * @function logout
         * @param {Object} state - The current state
         */
        logout: (state) => {
            state.firstName = null
            state.lastName = null
            state.email = null
            state.token = null
            localStorage.removeItem('token')
            sessionStorage.removeItem('token')
        },
    },
    extraReducers: authBuilders,
})

export const { logout } = authSlice.actions

export default authSlice.reducer
