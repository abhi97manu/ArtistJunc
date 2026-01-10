import { configureStore } from '@reduxjs/toolkit'

import currentPlaying from './Slice/SongSlice'


export const store = configureStore({
    reducer: {
        currentPlaying : currentPlaying
    }
})