import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
// import { thunk } from 'redux-thunk'
import authReducer from './authSlice'

/**
 * Configuration for redux-persist
 * @constant
 * @type {Object}
 * @property {string} key - The key for the reducer
 * @property {Object} storage - The storage engine to use
 * @property {Array<string>} whitelist - The list of reducer keys to persist
 */
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
}

/**
 * The root reducer object
 * @constant
 * @type {Object}
 * @property {Function} auth - The auth reducer
 */
const rootReducer = combineReducers({
    auth: authReducer,
})

/**
 * The persisted reducer, using the configuration and the root reducer
 * @constant
 * @type {Object}
 */
const persistedReducer = persistReducer(persistConfig, rootReducer)

/**
 * The Redux store configuration
 * @constant
 * @type {Object}
 * @property {Object} reducer - The root reducer
 * @property {boolean} devTools - Flag to enable or disable Redux DevTools
 * @property {Function} middleware - The middleware configuration
 */
export const store = configureStore({
    reducer: persistedReducer,
    devTools: import.meta.env.VITE_APP_USE_DEVTOOLS,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

/**
 * The persisted store, using the configured Redux store
 * @constant
 * @type {Object}
 */
export const persistor = persistStore(store)
