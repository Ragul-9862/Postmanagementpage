import { TextField } from '@mui/material'
import React from 'react'
import './Searchbar.css'

export default function Searchbar({filterSearch,setFilterSearch}) {
 
  return (
    <div>
        <TextField
         className='card-search'
         type='search'
         label="search"
         onChange={(e)=> setFilterSearch(e.target.value)}
         value={filterSearch}
        />
    </div>
  )
}
