import {
    fetchUserProfile,
    loginUser,
    refetchUserStatus,
    updateUserProfile,
} from './authThunks'

/**
 * Defines the state changes for each action in the authentication process.
 * @param {object} builder - The builder from createSlice.
 */
export const authBuilders = (builder) => {
    // Handle the state changes for the login user action
    builder
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

    // Handle the state changes for the refetch user status action
    builder
        .addCase(refetchUserStatus.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(refetchUserStatus.fulfilled, (state, action) => {
            state.loading = false
            state.token =
                localStorage.getItem('token') || sessionStorage.getItem('token')
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

    // Handle the state changes for the fetch user profile action
    builder
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

    // Handle the state changes for the update user profile action
    builder
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
}
