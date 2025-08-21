import React from 'react'
import { Link } from 'react-router-dom'
import '../css/AddButton.css'

const AddButton = () => {
   return (
      <div className='fixed'>
         <Link to='/income'>내역추가</Link>
      </div>
   )
}

export default AddButton