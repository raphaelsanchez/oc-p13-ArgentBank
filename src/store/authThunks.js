import { createAsyncThunk } from '@reduxjs/toolkit'
import api from './api'
import { logout } from './authSlice'

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
            const { token } = localStorage.getItem('token') || getState().auth
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
 * Async thunk for refetching user profil
 * @function refetchUserStatus
 * @returns {Object} The action to dispatch
 */
export const refetchUserStatus = createAsyncThunk(
    'auth/refetchUserStatus',
    async (_, { dispatch, rejectWithValue }) => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const response = await api.post('/user/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                return response.data
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // Le token n'est pas valide, déconnectez l'utilisateur
                    dispatch(logout())
                }
                if (error.response && error.response.data) {
                    return rejectWithValue(error.response.data)
                }
                return rejectWithValue(error.message)
            }
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
