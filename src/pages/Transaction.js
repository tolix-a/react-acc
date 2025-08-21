import React, { useContext, useEffect, useState } from 'react'
import AddButton from '../components/AddButton'
import Header from '../components/Header'
import { MyContext } from '../context/MyContext'
import List from '../components/List'
import { newData } from '../utils/newData'
import { useLocation } from 'react-router-dom'
import { useChartData } from '../hooks/useChartData'
import YearSelect from '../components/YearSelect'

export const Transaction = () => {
   const {data} = useContext(MyContext)
   const ymDivide = newData(data);
   const {selectedYear, setSelectedYear, allMonth} = useChartData(data);

   const [selectedMonth, setSelectedMonth] = useState(1);
   const [showAll, setShowAll] = useState(true);
   
   const resetDate = () => {
      setSelectedYear(new Date().getFullYear());
      setSelectedMonth(1);
   }
   
   const month = [
      '전체','1월','2월','3월','4월','5월','6월',
      '7월','8월','9월','10월','11월','12월'
   ];
   
   const filteredData = ymDivide.filter(item => {
      if (showAll) return true;
      
      if (selectedYear && selectedMonth) {
         return item.year === selectedYear && item.month === selectedMonth;
      }
      
      if (selectedYear && selectedMonth === 0) {
         return item.year === selectedYear;
      }

      if (selectedYear) {
         return item.year === selectedYear;
      }
      
      if (selectedMonth) {
         return item.month === selectedMonth;
      }
      
      return true;
   });


   const [sort, setSort] = useState(true);

   function toggle() {
      setSort(prev => !prev);
   }
   
   if(sort === true){
      filteredData.sort((a,b) => new Date (b.date) - new Date(a.date))
   } else {
      filteredData.sort((a,b) => new Date (a.date) - new Date(b.date))
   }


   //yearpage에서 받기
   const location = useLocation();
   useEffect(()=>{
      const {ypage, y, m} = location.state || {};

      if(ypage === false){
         setShowAll(ypage);
         setSelectedYear(y);
         setSelectedMonth(m);
      }

   },[location.state])

   
   return (
      <div className='tran'>
         <Header/>

         <li className='all'>

            <div className='sticky'>
               <h4 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  입출금내역
               </h4>
               
               <div className='allbtn'>
                  <div className='allbtns'>
                     <button onClick={() => { setShowAll(true); resetDate(); }} className={(showAll) ? 'active' : ''}>전체 ({data.length})</button>
                     <button onClick={() => { setShowAll(false) }} className={(!showAll) ? 'active' : ''}>날짜 선택</button>
               
                     <div className={`dateBtn ${(!showAll) ? 'show' : ''}`}>
               
                        <YearSelect  selectedYear={selectedYear} setSelectedYear={setSelectedYear} allMonth={allMonth}/>
               
                        <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
                           {month.map((m, i) => (
                              <option key={i} value={i}>{m}</option>
                           ))}
                        </select>
                     </div>
                  </div>
               
                  <button onClick={toggle} className='sortbtn'>{sort ? '최신순 ▲' : '오래된순 ▼'}</button>
               </div>
            </div>


            <List listData={filteredData} />

         </li>
         
         
         <AddButton/>
      </div>
   )
}