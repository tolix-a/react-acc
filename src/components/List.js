import React from 'react'
import comma from '../utils/comma'
import Popup from './Modal'


const List = ( {listData} ) => {
   return (
      <ul>
      {listData.length > 0 ? (
         listData.map((obj, index)=>
         <li key={index} className='mlist'>
            <div className='lidiv'>
               <div className='listbtn'>
                  <p>{obj.year}년 {obj.month}월 {obj.day}일</p>
                  <Popup content={obj} btnName={'x'} title={'삭제'}/>
               </div>
               <p>{obj.msg}</p>
            </div>
            {obj.type === 'income' ? <b className='pl'>+{comma(obj.money)}</b> : <b className='mi'>–{comma(obj.money)}</b>}
         </li>
         )) : (
         <p className='nodata'>내역이 없습니다.</p>
      )}
      </ul>
   )
}

export default List