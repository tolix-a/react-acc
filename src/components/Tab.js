import React from 'react'
import Chart from './MonthlyChart'


export function TabChart ({isAll, selectedYear, allMonth}) {
   if (isAll === 0) {
      return <div><Chart year={selectedYear} data={allMonth} type={1}/></div>
   }
   if (isAll === 1) {
      return <div><Chart year={selectedYear} data={allMonth} type={2}/></div>
   }
   if (isAll === 2) {
      return <div><Chart year={selectedYear} data={allMonth} type={3}/></div>
   }
   if (isAll === 3) {
      return <div><Chart year={selectedYear} data={allMonth} type={4}/></div>
   }
}


export const Tab = ({isAll, setIsAll}) => {
   return (
      <div className='tabtn'>
         <button className={isAll === 0 ? 'active': ''} 
         onClick={ () => { setIsAll(0) } }>입출금</button>
         <button className={isAll === 1 ? 'active': ''}
         onClick={ () => { setIsAll(1) } }>입금</button>
         <button className={isAll === 2 ? 'active': ''}
         onClick={ () => { setIsAll(2) } }>출금</button>
         <button className={isAll === 3 ? 'active': ''}
         onClick={ () => { setIsAll(3) } }>합산</button>
      </div>
   )
}
