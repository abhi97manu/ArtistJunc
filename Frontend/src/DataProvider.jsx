import React, {  useState } from 'react'
import { DataContext } from '../DataContext'

const DataProvider = ({children}) => {
     const [addNew, setAddNew ] = useState(false);
     const [isPlaying, setIsPlaying] = useState(false)
     const [currentPlaying, setCurrentPlaying] = useState()
  return (
    
         <DataContext.Provider value={ {addNew, setAddNew , isPlaying, setIsPlaying,currentPlaying,setCurrentPlaying }}>
                {children}
         </DataContext.Provider>
  )
}

export default DataProvider