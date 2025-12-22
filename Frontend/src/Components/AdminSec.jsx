import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import { DataContext } from '../../DataContext'
import Media from '../Components/Media'

import ImageKit from 'imagekit-javascript'

const serverUrl = import.meta.env.VITE_SERVER_URL;

const AdminSec = () => {


const {addNew,isPlaying } = useContext(DataContext)
const [allSongs, setAllSongs] = useState();



useEffect( ()=>{
    axios.get(`${serverUrl}/userSongs`)
    .then(response =>{
        console.log(response.data);
        setAllSongs(response.data)
        
    })
    .catch(error=>{
        console.log("error : " , error);
        
    })
   
},[])

  return (
    <>
    <div className=' h-full w-full  '>
        
        <div className=' w-full '>
            <div className='w-[100%]  h-16 flex items-center'>
                <h2 className='text-2xl w-full font-bold mx-4 border-b-2'>All Songs</h2>

            </div>

            <div className='w-full h-[100%] p-4  grid lg:grid-cols-3 gap-4 items-center grid-cols-1'>

            { (allSongs) && (
                allSongs.map((ele,i) => (
                    <NewSongCard key = {i} songData = {ele}/>
             )) 
            
            )}
            
             
             <BlankCard/>
             
                
            </div>
              
        </div>
         


             

    </div>
     {
                    addNew && (<SongForm/>)
     }   

     { 
     isPlaying &&
        (
                            
        <Media/>
                        
           )
      }
    </>
  )
}

export default AdminSec


const BlankCard = () =>{

   const {addNew, setAddNew} = useContext(DataContext)
    return(
 <div className='outline-1 outline-dashed h-32 cols-span-1 flex gap-3 justify-center items-center'>
                   
                   <div className='hover:cursor-pointer' onClick={()=>setAddNew(true)}>
                    <svg className='place-self-center'
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                >
                                
                                <circle cx="12" cy="12" r="10" />

                               
                                <line x1="12" y1="8" x2="12" y2="16" />
                                <line x1="8" y1="12" x2="16" y2="12" />
                     </svg>
                     <p>Add Songs</p>
                    </div> 
              
    </div>
    )
}


const SongForm = () =>{
   

   
   
    
     const { setAddNew} = useContext(DataContext)
    
     const [loading, setLoading] = useState(false);
     const [songTitle, setSongTitle] = useState(" ");
     const [songDesc, setSongDesc] = useState(" ");
     const [songFeat, setSongFeat] = useState(" ");
     const [songType, setSongType] = useState(" ");

     const [songDetail, setSongDetail] = useState(
        {
            Title : "",
            Desc : "",
            Feat: "",
            Type : "",
            ImgCover : "",
            SongFile : ""

        }
     )
     
     

     function onSubmitHandler(e){
            e.preventDefault()
          
          //  setAddNew(false)
            uploadToImageKit();
           

     }

     function HandleImageFile(e){
            setSongDetail(prev => ({...prev, ImgCover: e.target.files[0] }))
     }

     function HandleSongFile(e){
            setSongDetail(prev => ({...prev, SongFile: e.target.files[0] }))
     }

     const uploadToImageKit = async ()=>{
            

           try{
            const formdata = new FormData()
            for( const key in songDetail)
                {
                  
                 formdata.append(key,songDetail[key])
                   
                }

                setLoading(true)
               const res =  await axios.post(`${serverUrl}/upload_song`,formdata)
             
               
               
               console.log(res.data);
               

           }
           catch(error)
           {
                console.log(error);
                
           }
           finally{
            setLoading(false);
            setAddNew(false)
           }
            }

     
    return(
        <div className='w-full h-full bg-stone-800/60 absolute border-4 text-center flex justify-center items-center'  >
           { !loading ? ( <div className='w-[30%]  bg-white rounded-2xl' onClick={(e)=>e.stopPropagation()}>
               
                <div className='absolute place-self-end translate-y-3 translate-x-3 hover:cursor-pointer '  onClick={()=>setAddNew((prev)=>!prev)}>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                >
                
                <circle cx="12" cy="12" r="10" />

               
                <line x1="8" y1="8" x2="16" y2="16" />
                <line x1="16" y1="8" x2="8" y2="16" />
                </svg>

                </div>
                <form className='grid gap-3 p-4' onSubmit={onSubmitHandler}>
                <h2>Add Your Music</h2>
                <input type="text" placeholder='Song Title' className='border italic p-2' value = {songDetail.Title} onChange={(e)=>setSongDetail(prev =>({...prev,Title: e.target.value} ))}/>
                <div className='flex text-center items-cetner gap-4' >
                <label >Single <input type='radio' name="Cover" value = "Single" onChange={(e)=>setSongDetail(prev =>({...prev,Type: e.target.value} ))}/></label>
                <label >Album <input type='radio' name="Cover" value = "Album" onChange={(e)=>setSongDetail(prev =>({...prev,Type: e.target.value} ))}/></label>
                </div>
                <input type="text" placeholder='Song Description' className='border italic p-2' value = {songDetail.Desc} onChange={(e)=>setSongDetail(prev =>({...prev,Desc: e.target.value} ))}/>
                <input type="text" placeholder='Any Feat.' className='border italic p-2' value = {songDetail.Feat} onChange={(e)=>setSongDetail(prev =>({...prev,Feat: e.target.value} ))}/>
                <div className='outline-2 outline-dashed imageFile'>
                   <label className=' hover:cursor-pointer'>+ Add Music Cover<input type='file' accept='image/*' className='hidden'  onChange={HandleImageFile}></input></label> 
                </div>

                <div className='outline-2 outline-dashed audioFile'>
                   <label className=' hover:cursor-pointer'>+ Add Music File<input type='file' accept='audio/*' className='hidden' onChange={HandleSongFile}></input></label> 
                </div>
                <button className='bg-blue-400 rounded-md p-2 text-lg font-semibold cursor-pointer'>Lets Upload !</button>
                
            </form  >


            
            </div>
        ) 
        
        :
        
        ( <div className='w-32 h-32 bg-red-400'>
            </div>)}   

           
         
        </div>
    )
}


const NewSongCard = ({songData}) =>{

   const {setIsPlaying} = useContext(DataContext)
    return (
       <div className='outline-1 outline-solid  flex box-border p-2'>
                   
                  
               <img src ={songData.ImageFile} className=' w-32 h-32 '></img>
               <div className='grid grid-cols-3 items-center text-center justify-center px-2 w-full'>
                   <div className='col-span-2 leading-4 items-center '>
                       <h1 className='text-xl font-extrabold'>{songData.Title}</h1>
                       <h1 className='text-lg font-medium underline'>{songData.Feat}</h1>
                       <h1 className='text-sm font-light italic'>{songData.Type}</h1>
                   </div>
                   <div className='col-span-1 place-self-end '>
                       <svg fill="#03643fff" height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                               viewBox="0 0 492.308 492.308" xml:space="preserve"  onClick={()=>setIsPlaying((prev)=> !prev)} className='hover:cursor-pointer'>
                               <g>
                                   <g>
                                       <path d="M139.346,118.995v254.313l261.74-127.154L139.346,118.995z M159.038,150.457l196.99,95.697l-196.99,95.692V150.457z"/>
                                   </g>
                               </g>
                               <g>
                                   <g>
                                       <path d="M246.154,0C110.423,0,0,110.423,0,246.154s110.423,246.154,246.154,246.154s246.154-110.423,246.154-246.154
                                           S381.885,0,246.154,0z M246.154,472.615c-124.875,0-226.462-101.591-226.462-226.462S121.279,19.692,246.154,19.692
                                           s226.462,101.591,226.462,226.462S371.029,472.615,246.154,472.615z"/>
                                   </g>
                               </g>
                       </svg>
                   </div>
               </div>
                        
                   
              
    </div>
    )
}

