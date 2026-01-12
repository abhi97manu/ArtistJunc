import {createSlice} from '@reduxjs/toolkit'


const CurrentPlaySlice = createSlice({
    name : "currentPlaying",
    initialState: {
        isPlaying : false,
        songId: 0
    },
    reducers:{
     
        togglePlay(state){
                state.isPlaying = !state.isPlaying;
        },
        setSong(state,action){
            state.songId = action.payload;
        }
    }
})

export const {play,pause,setSong, togglePlay} = CurrentPlaySlice.actions;

export default CurrentPlaySlice.reducer;