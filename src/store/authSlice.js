import { createSlice } from '@reduxjs/toolkit'
import {
    fetchUserProfile,
    loginUser,
    refetchUserStatus,
    updateUserProfile,
} from './authThunks'

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
    extraReducers: (builder) => {
        builder
            // Login user cases (pending, fulfilled, rejected)
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.token = action.payload.body.token
                if (localStorage.getItem('token')) {
                    state.token = localStorage.getItem('token')
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Check user status cases (pending, fulfilled, rejected)
            .addCase(refetchUserStatus.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(refetchUserStatus.fulfilled, (state, action) => {
                state.loading = false
                state.token =
                    localStorage.getItem('token') ||
                    sessionStorage.getItem('token')
                if (action.payload && action.payload.body) {
                    state.firstName = action.payload.body.firstName
                    state.lastName = action.payload.body.lastName
                    state.email = action.payload.body.email
                }
            })
            .addCase(refetchUserStatus.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Fetch user profile cases (pending, fulfilled, rejected)
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false
                state.firstName = action.payload.body.firstName
                state.lastName = action.payload.body.lastName
                state.email = action.payload.body.email
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Update user profile cases (pending, fulfilled, rejected)
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false
                state.firstName = action.payload.body.firstName
                state.lastName = action.payload.body.lastName
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
