import { createSlice } from "@reduxjs/toolkit";

const CurrentPlaySlice = createSlice({
  name: "currentPlaying",
  initialState: {
    isPlaying: false,
    songId: 0,
    currentPage:0,
  },
  reducers: {
    togglePlay(state) {
      state.isPlaying = !state.isPlaying;
    },
    setSong(state, action) {
      state.songId = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setCurrentPage: (state,action)=>{
      state.currentPage = action.payload;
    }
  },
});

export const { play, pause, setSong, togglePlay,setIsPlaying,setCurrentPage } = CurrentPlaySlice.actions;

export default CurrentPlaySlice.reducer;
