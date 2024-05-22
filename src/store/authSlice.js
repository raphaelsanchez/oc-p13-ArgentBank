import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../api'

/**
 * Async thunk for logging in
 * @function loginUser
 * @param {Object} credentials - The user's credentials
 * @returns {Object} The action to dispatch
 */
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.post('/user/login', credentials)
            return response.data
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue({ message: 'Invalid credentials' })
            }
            return rejectWithValue(error.message)
        }
    }
)

/**
 * Async thunk for fetching user profile
 * @function fetchUserProfile
 * @returns {Object} The action to dispatch
 */
export const fetchUserProfile = createAsyncThunk(
    'auth/fetchUserProfile',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth
            const response = await api.post(
                '/user/profile',
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            return response.data
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            }
            return rejectWithValue(error.message)
        }
    }
)

/**
 * Async thunk for updating user data
 * @function updateUserProfile
 * @param {Object} userUpdates - The updates to the user's profile
 * @returns {Object} The action to dispatch
 */
export const updateUserProfile = createAsyncThunk(
    'auth/updateUserProfile',
    async (userUpdates, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth
            const response = await api.put('/user/profile', userUpdates, {
                headers: { Authorization: `Bearer ${token}` },
            })
            return response.data
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            }
            return rejectWithValue(error.message)
        }
    }
)

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
            state.user = null
            state.token = null
            localStorage.removeItem('token')
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
                state.rememberMe = action.payload.body.rememberMe
                if (state.rememberMe) {
                    localStorage.setItem('token', action.payload.body.token)
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
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
