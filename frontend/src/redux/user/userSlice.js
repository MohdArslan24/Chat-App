import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null,
        isAuthenticated: false,
        isLoading: true
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
            state.isLoading = false
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
})

export const {setUserData, setLoading} = userSlice.actions
export default userSlice.reducer