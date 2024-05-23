import axios from 'axios'

/**
 * Creates an axios instance with default configuration.
 * @type {axios}
 */
const api = axios.create({
    // Sets the base URL for the API in .env file
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
})

/**
 * Adds a request interceptor to the axios instance.
 * This interceptor will be invoked before the request is sent.
 */
api.interceptors.request.use(
    /**
     * Success function for the request interceptor.
     * @param {Object} config - The request configuration.
     * @returns {Object} - The potentially modified request configuration.
     */
    (config) => {
        const token = localStorage.getItem('token')
        token && (config.headers.Authorization = `Bearer ${token}`)
        return config
    },

    /**
     * Error function for the request interceptor.
     * @param {Error} error - The error that occurred.
     * @returns {Promise<Error>} - A promise rejected with the error.
     */
    (error) => {
        return Promise.reject(error)
    }
)

// Exports the axios instance
export default api
