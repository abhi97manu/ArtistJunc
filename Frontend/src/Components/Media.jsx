import React, { useContext, useState } from 'react'
import { DataContext } from '../../DataContext'
const Media = () => {


    const {isPlaying, setIsPlaying} = useContext(DataContext)
  return (
    <div className=' w-full grid grid-cols-6 items-center text-white h-24 bg-stone-950/70 rounded-2xl bottom-2 fixed z-10'>
       <div className=' col-span-1 text-center flex px-2 items-center gap-2'>
             <img src="7lyrs.jpg" alt="song_title" className='w-[28%] rounded-2xl' ></img> 
            <p>Name of Song</p>
       </div>
       <div className='col-span-5 '>
        <div className='flex place-self-center items-center gap-3'>

             <svg fill="#ffffffff" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.308 492.308" xml:space="preserve">
               <g>
	                <g>
		                    <path d="M317.827,175.189V70.014L0,251.168l317.827,181.164V327.157l184.519,105.175V70.014L317.827,175.189z M298.135,398.447
			                    L39.769,251.168l258.365-147.26V398.447z M482.654,398.447l-164.817-93.952V197.851l164.817-93.942V398.447z"/>
	                </g>
                </g>

            </svg>

           
            {
                !isPlaying ?
           <svg fill="#ffffffff" height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	            viewBox="0 0 492.308 492.308" xml:space="preserve" onClick={()=>setIsPlaying(prev=>!prev)} className='hover:cursor-pointer'>
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
            :
                
            <svg fill="#ffffffff" height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	            viewBox="0 0 492.308 492.308" xml:space="preserve" onClick={()=>setIsPlaying(prev=>!prev)} className='hover:cursor-pointer'>
                <g>
	                <g>
		                <rect x="182.154" y="166.154" width="32" height="160" rx="8" ry="8" />
                        <rect x="262.154" y="166.154" width="32" height="160" rx="8" ry="8" />
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



            }
            
            <svg className='transform scale-x-[-1]' fill="#ffffffff" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.308 492.308" xml:space="preserve">
               <g>
	                <g>
		                    <path d="M317.827,175.189V70.014L0,251.168l317.827,181.164V327.157l184.519,105.175V70.014L317.827,175.189z M298.135,398.447
			                    L39.769,251.168l258.365-147.26V398.447z M482.654,398.447l-164.817-93.952V197.851l164.817-93.942V398.447z"/>
	                </g>
                </g>

            </svg>


        </div>
        <div className=' w-[90%]  place-self-center'>
                <input type="range" className='slider'></input>

        </div>
       </div>

    </div>
  )
}

export default Media