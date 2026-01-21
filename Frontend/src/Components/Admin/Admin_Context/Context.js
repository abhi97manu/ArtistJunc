import { createContext, useState } from "react"

const SongContext = createContext()
const SongProvider = ({children})=>{
        const [isPlaying, setIsPlaying] = useState(false)

        return(
            <SongContext.Provider value = {[isPlaying,setIsPlaying]}>
                {children}
            </SongContext.Provider>
        )
}

export default SongProvider