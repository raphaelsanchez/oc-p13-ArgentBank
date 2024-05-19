import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './userSlice'

/**
 * The Redux store configuration.
 *
 * @typedef {Object} StoreConfig
 * @property {Object} reducer - The root reducer object that defines the state structure.
 * @property {boolean} devTools - Whether to enable Redux DevTools extension.
 */
export const store = configureStore({
    reducer: {
        // Define a top-level state field named `user`, handled by `userSlice`
        user: userSlice.reducer,
    },
    devTools: true,
})
