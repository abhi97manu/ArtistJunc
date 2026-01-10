import {createSlice} from '@reduxjs/toolkit'


const CurrentPlaySlice = createSlice({
    name : "currentPlaying",
    initialState: {
        isPlaying : false,
        songId: 0
    },
    reducers:{
        play(state){
            state.isPlaying = true;
        },
        pause(state){
            state.isPlaying = false;
        },
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