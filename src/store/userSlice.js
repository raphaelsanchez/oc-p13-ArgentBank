import { createSlice } from '@reduxjs/toolkit'

/**
 * Initial state object for the user slice.
 *
 * use sessionStorage or localStorage to persist the user's information.
 *
 * @typedef {Object} InitialState
 * @property {string} firstname - The user's first name.
 * @property {string} lastname - The user's last name.
 * @property {string|null} token - The user's authentication token.
 */
const initialState = {
    firstname:
        localStorage.getItem('firstname') ||
        sessionStorage.getItem('firstname') ||
        '',
    lastname:
        localStorage.getItem('lastname') ||
        sessionStorage.getItem('lastname') ||
        '',
    token:
        localStorage.getItem('token') ||
        sessionStorage.getItem('token') ||
        null,
}

/**
 * Creates a Redux slice for the user.
 * @type {import("@reduxjs/toolkit").Slice<UserSlice>}
 */
export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        /**
         * Updates the user's information after login.
         * @param {UserSlice} state - The current state of the user slice.
         * @param {Object} action - The Redux action containing the payload.
         * @param {string} action.payload.firstname - The user's updated first name.
         * @param {string} action.payload.lastname - The user's updated last name.
         * @param {string} action.payload.token - The user's updated authentication token.
         */
        loginUser: (state, action) => {
            // {type: "user/loginUser", payload: {firstname: "John", lastname: "Doe", token: "fakeToken123"}}
            state.firstname = action.payload.firstname
            state.lastname = action.payload.lastname
            state.token = action.payload.token
        },

        /**
         * Updates the user's first and last name.
         * @param {UserSlice} state - The current state of the user slice.
         * @param {Object} action - The Redux action containing the payload.
         * @param {string} action.payload.firstname - The user's updated first name.
         * @param {string} action.payload.lastname - The user's updated last name.
         */
        updateUser: (state, action) => {
            // {type: "user/updateUser", payload: {firstname: "John", lastname: "Doe"}
            state.firstname = action.payload.firstname
            state.lastname = action.payload.lastname

            return state
        },

        /**
         * Logs out the user by resetting the user's information and token.
         * @param {UserSlice} state - The current state of the user slice.
         */
        logoutUser: (state) => {
            // {type: "user/logoutUser"}
            for (let key in state) {
                state[key] = key === 'token' ? null : ''
            }
        },
    },
})

/**
 * Actions for user slice.
 * These actions are used to update the user's information in the Redux store
 * @namespace userSlice.actions
 * @type {Object}
 *
 * The actions are:
 * - loginUser: Updates the user's information after login.
 * - updateUser: Updates the user's first and last name.
 * - logoutUser: Logs out the user by resetting the user's information and token.
 */
export const { loginUser, logoutUser, updateUser } = userSlice.actions
