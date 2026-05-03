import {configureStore} from '@reduxjs/toolkit'
import userSlice from './user/userSlice'
import convoSlice from './convoSlice'

 const store = configureStore({
    reducer: {
        user: userSlice,
        convo: convoSlice
    }
})

export default store