import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Header.css'
import Popup from './Modal'

const Header = () => {
   return (
      <div className='header'>
         <div className='hcontent'>
            <Link to='/'>Ᾱccόuͷt</Link>
            <div>
               <Link to='/year'>연간내역 </Link>
               <Link to='/transaction'>입출금내역</Link>
               <Popup btnName={'초기화'} title={'초기화'}/>
            </div>
         </div>
      </div>
   )
}

export default Header