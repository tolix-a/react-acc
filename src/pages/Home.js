import React, { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {MyContext} from '../context/MyContext';
import AddButton from '../components/AddButton';
import comma from '../utils/comma';
import Header from '../components/Header'
import { newData } from '../utils/newData';
import List from '../components/List';
import { useChartData } from '../hooks/useChartData';
import { Tab, TabChart } from '../components/Tab';
import YearSelect from '../components/YearSelect';

const Home = () => {
   const {data} = useContext(MyContext)
   const {selectedYear,setSelectedYear,isAll,setIsAll,allMonth} = useChartData(data);
      
   //총합 계산
   function dataExt(n){
      if(n.length > 0){

         let moneyExt = {income:0,expense:0}
         n?.forEach((obj)=>{      
            if(obj.type === 'income'){
               moneyExt.income += Number(obj.money);
            }else{
               moneyExt.expense += Number(obj.money);
            }
         })
         return moneyExt;
         
      } else{
         return 0
      }
   }

   const totall = useMemo(()=> {
      let m = dataExt(data || []);
      let m2 = m.income - m.expense;
      return m2
   }, [data]);


   //연간내역 (년도별, 입금 지출 합산)
   const yearlySummary = data.reduce((acc, { date, type, money }) => {
      const year = date.split("-")[0];
      if (!acc[year]) acc[year] = { income: 0, expense: 0 };
      acc[year][type] += money;
      return acc;
   }, {});

   const formattedSummary = Object.entries(yearlySummary).map(([year, { income, expense }]) => ({
      year: parseInt(year),
      income,
      expense,
      sum: income - expense
   }))
   .sort((a, b) => b.year - a.year)
   .slice(0,3);

   
   //입출금내역 4개
   const ymDivide = newData(data);
   ymDivide.sort((a,b) => new Date(b.date) - new Date(a.date))
   const fourItem = ymDivide.slice(0,4);

   
   return (
      <div className='home'>
         <Header/>
         <h3><span>나</span>의 총 자산</h3>
         {data.length > 0 ? (
            <h1 className={totall >= 0 ? 'pl' : 'mi'}>{comma(totall)}원</h1>
            ) : (
            <h1 className='pl'>0원</h1>
         )}

         <ul>
            <li className='year'>
               <div className='toall'>
                  <h3>연간내역</h3>
                  <Link to='/year'>더보기</Link>
               </div>

               {formattedSummary.length > 0 ? (
                  formattedSummary.map((obj, index)=>
                  <div className='y1' key={index}>
                     <p className='yy'>{obj.year}</p>
                     <div className='y2'>
                        <p><b className='pl'>+{comma(obj.income)}</b></p>
                        <p><b className='mi'>-{comma(obj.expense)}</b></p>
                        <p><b>{comma(obj.sum)}</b></p>
                     </div>
                  </div> 
                  )) : (
                  <div className='nodata'>내역이 없습니다.</div>
               )}
            </li>

            <li className='chart'>
               <h3>연간차트</h3>
               <div className='yearbtns'>
                  <Tab isAll={isAll} setIsAll={setIsAll}/>
                  <YearSelect selectedYear={selectedYear} setSelectedYear={setSelectedYear} allMonth={allMonth}/>
               </div>
               <TabChart isAll = {isAll} selectedYear={selectedYear} allMonth={allMonth}/>
            </li>

            <li className='all'>
               <div className='toall'>
                  <h3>입출금내역</h3>
                  <Link to='/transaction'>전체보기</Link>
               </div>

               <List listData={fourItem}/>
            </li>
               

            <AddButton/>

         </ul>
      </div>
   )
}

export default Home