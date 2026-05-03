import {createSlice} from '@reduxjs/toolkit'

const convoSlice = createSlice({
    name: 'convo',
    initialState: {
        convos: [],
        isLoading: true
    },
    reducers: {
        setConvos: (state, action) => {
            state.convos = action.payload
        },
    }
})

export const {setConvos} = convoSlice.actions
export default convoSlice.reducer