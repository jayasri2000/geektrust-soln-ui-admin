import React from 'react'
import './Search.css'


export const GlobalFilter = ({ filter, setFilter }) => {
  
  return (
    <>
    <span>
    
      Search by ID,Name,Email or Role:{' '}
      <input
        value={filter || ''}
        onChange={(e) => 
          setFilter(e.target.value)
        } />
   
    
        
    </span>
    </>
  )
}