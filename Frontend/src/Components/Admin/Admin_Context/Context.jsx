import { createContext, useState } from "react"

export const SongContext = createContext();

const SongProvider = ({children})=>{
        const [isPlaying, setIsPlaying] = useState(null)
         const [currentSong , setCurrentSong] = useState();

        return(
            <SongContext.Provider value = {{isPlaying , setIsPlaying, setCurrentSong,currentSong}}>
                {children}
            </SongContext.Provider>
        )
}

export default SongProvider