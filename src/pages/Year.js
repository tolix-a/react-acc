import React, { useContext, useEffect, useState } from 'react'
import AddButton from '../components/AddButton'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { MyContext } from '../context/MyContext'
import YearSelect from '../components/YearSelect'
import { useChartData } from '../hooks/useChartData'
import { Tab, TabChart } from '../components/Tab'
import LineChart from '../components/LineChart'
import comma from '../utils/comma'


const Year = () => {
   const {data} = useContext(MyContext)
   const {selectedYear,setSelectedYear,isAll,setIsAll,allMonth} = useChartData(data);

   const [show, setShow] = useState(true);

   //기본 요약, 상세 통계
   const cal = {};
   
   if(data.length > 0){
      data.forEach(({ date, type, money }) => {
         const [year, monthStr] = date.split("-");
         const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));

         if (!cal[year]) {
            cal[year] = {
               totalIn: 0,
               totalOut: 0,
               maxIn: 0,
               maxOut: 0,
               transactionCount: {}
            };

            //거래 횟수 기본값
            months.forEach(m => {
               cal[year].transactionCount[m] = 0;
            });
         }

         const result = cal[year];

         if (type === "income") {
            result.totalIn += money;
            result.maxIn = Math.max(result.maxIn, money);
         } else if (type === "expense") {
            result.totalOut += money;
            result.maxOut = Math.max(result.maxOut, money);
         }
         result.transactionCount[monthStr] += 1;
      })
   } else {
      const year = new Date().getFullYear();
      cal[year] = {
         totalIn: 0,
         totalOut: 0,
         maxIn: 0,
         maxOut: 0,
         transactionCount: {}
      };
   }

   const yearData = {};

   Object.entries (cal).forEach(([year, data]) => {
      //최다, 최소거래
      const monthlyCounts = data.transactionCount;
      const entries = Object.entries(monthlyCounts);
      const counts = entries.map(([_, count]) => count);
      const maxCount = Math.max(...counts);
      const minCount = Math.min(...counts);

      const mostMonth = entries
         .filter(([_, count]) => count === maxCount)
         .map(([month, count]) => ({ 월: Number(month), 횟수: count }))
         .sort((a, b) => a.월 - b.월)

      const leastMonth = entries
         .filter(([_, count]) => count === minCount)
         .map(([month, count]) => ({ 월: Number(month), 횟수: count }))
         .sort((a, b) => a.월 - b.월)
      
      yearData[year] = {
         총입금액: data.totalIn,
         총출금액: data.totalOut,
         잔액: data.totalIn - data.totalOut,
         최대입금액: data.maxIn,
         최대출금액: data.maxOut,
         평균입금액: Math.round(data.totalIn / 12),
         평균출금액: Math.round(data.totalOut / 12),
         최다거래: mostMonth,
         최소거래: leastMonth,
      };
   });

   
   //분기별 차트
   const quarterData = {};

   if(data.length > 0){
      data.forEach(({ date, type, money }) => {
         const [year, monthStr] = date.split("-");
         const month = parseInt(monthStr);
         const quarter = `q${Math.ceil(month / 3)}`;

         if (!quarterData[year]) {
            quarterData[year] = {
               q1: { 입금: 0, 출금: 0, 잔액: 0 },
               q2: { 입금: 0, 출금: 0, 잔액: 0 },
               q3: { 입금: 0, 출금: 0, 잔액: 0 },
               q4: { 입금: 0, 출금: 0, 잔액: 0 }
            }
         };

         const result = quarterData[year];

         if (type === "income") {
            result[quarter].입금 += money;
         } else if (type === "expense") {
            result[quarter].출금 += money;
         }
         result[quarter].잔액 = result[quarter].입금 - result[quarter].출금
      })
   } else {
      const year = new Date().getFullYear();
      quarterData[year] = {
         q1: { 입금: 0, 출금: 0, 잔액: 0 },
         q2: { 입금: 0, 출금: 0, 잔액: 0 },
         q3: { 입금: 0, 출금: 0, 잔액: 0 },
         q4: { 입금: 0, 출금: 0, 잔액: 0 }
      };
   }   
   

   //증감 계산
   function percentCal (now, last){
      if (last === 0) return 0;
      return Math.round(((now - last) / Math.abs(last)) * 100);
   }


   //표
   const tableData = ['q1','q2','q3','q4'].map((q,i)=>{
      const lastin = quarterData[selectedYear-1]?.[q]?.입금 ?? 0;
      const lastout = quarterData[selectedYear-1]?.[q]?.출금 ?? 0;
      const lasttotal = quarterData[selectedYear-1]?.[q]?.잔액 ?? 0;

      return {
         title: `${i + 1}분기`,
         nowin: quarterData[selectedYear][q].입금,
         nowout: quarterData[selectedYear][q].출금,
         nowtotal: quarterData[selectedYear][q].잔액,
         lastin,
         lastout,
         lasttotal,
         ratein: percentCal(quarterData[selectedYear][q].입금, lastin),
         rateout: percentCal(quarterData[selectedYear][q].출금, lastout),
         ratetotal: percentCal(quarterData[selectedYear][q].잔액, lasttotal),
      }
   })


   
   //기본 전년대비
   const compare = {};

   if (yearData[selectedYear - 1]){
      compare.totalin = yearData[selectedYear].총입금액 - yearData[selectedYear-1].총입금액;
      compare.totalout =  yearData[selectedYear].총출금액 - yearData[selectedYear-1].총출금액;
      compare.total = yearData[selectedYear].잔액 - yearData[selectedYear-1].잔액;
      compare.perin = percentCal(yearData[selectedYear].총입금액,yearData[selectedYear-1].총입금액);
      compare.perout = percentCal(yearData[selectedYear].총출금액,yearData[selectedYear-1].총출금액);
      compare.pertotal = percentCal(yearData[selectedYear].잔액,yearData[selectedYear-1].잔액);
   }
   

   useEffect(()=>{
      window.scrollTo({top:0,behavior:'auto'})
   },[selectedYear])

   return (
      <div className='ypage'>
         <Header/>

         <div className='yptitle'>
            <h3 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
               <span>{selectedYear}</span> 연간내역
            </h3>
            <YearSelect selectedYear={selectedYear} setSelectedYear={setSelectedYear} allMonth={allMonth}/>
         </div>
         

         <section className='summary'>
            <h4>기본 요약</h4>
            <ul>
               <li>총 입금액:<span className='pl'>{comma(yearData[selectedYear].총입금액)}</span>원</li>
               <li>총 출금액:<span className='mi'>{comma(yearData[selectedYear].총출금액)}</span>원</li>
               <li>총 합:<span className={yearData[selectedYear].잔액 >= 0 ? 'pl' : 'mi'}>{comma(yearData[selectedYear].잔액)}</span>원</li>
            </ul>
            
            {(yearData[selectedYear - 1]) ? 
            <div className='compare'>
               <h5>전년대비</h5>
               <ul>
                  <li>총 입금액:<span className='pl'>{comma(compare.totalin)}</span>원
                  <span className={compare.perin > 0 ? 'pl' : 'mi'}>{compare.totalin > 0 ? '▲' : '▼'}</span>
                  ({compare.perin}%)</li>
                  <li>총 출금액:<span className='mi'>{comma(compare.totalout)}</span>원
                  <span className={compare.perout > 0 ? 'pl' : 'mi'}>{compare.totalout > 0 ? '▲' : '▼'}</span>
                  ({compare.perout}%)</li>
                  <li>총 합:<span className={compare.pertotal > 0 ? 'pl' : 'mi'}>{comma(compare.total)}</span>원
                  <span className={compare.pertotal > 0 ? 'pl' : 'mi'}>{compare.total > 0 ? '▲' : '▼'}</span>
                  ({compare.pertotal}%)</li>
               </ul>
            </div> : ''
            }
         </section>
         
         <section className='chart'>
            <h4>연간차트</h4>

            <Tab isAll={isAll} setIsAll={setIsAll}/>
            <TabChart isAll = {isAll} selectedYear={selectedYear} allMonth={allMonth}/>
         </section>

         <section className='summary2'>
            <div>
               <h4>상세 통계</h4>
               <button onClick={()=> setShow(p => !p)}>
                  {show ? '∧' : '∨'}</button>
            </div>
            
            <ul className={show ? '' : 'none'}>
               <li>최대 입금액:<span className='pl'>{comma(yearData[selectedYear].최대입금액)}</span>원</li>
               <li>최대 출금액:<span className='mi'>{comma(yearData[selectedYear].최대출금액)}</span>원</li>
               <li>월 평균 입금액:<span className='pl'>{comma(yearData[selectedYear].평균입금액)}</span>원</li>
               <li>월 평균 출금액:<span className='mi'>{comma(yearData[selectedYear].평균출금액)}</span>원</li>
               {data.length > 0 ? <>
               <li>최다 거래:  
                  <span>{yearData[selectedYear].최다거래.map(i => i.월).join(', ')}</span>월,
                  <span>{yearData[selectedYear].최다거래[0].횟수}</span>회
               </li>
               <li>최소 거래:   
                  <span>{yearData[selectedYear].최소거래.map(i => i.월).join(', ')}</span>월,
                  <span>{yearData[selectedYear].최소거래[0].횟수}</span>회
               </li>
               </> : ''
               }
            </ul>

         </section>

         
         
         <section>
            <h4>분기별차트</h4>
            <LineChart data={quarterData[selectedYear]}/>
         </section>


         <section className='lastyear'>
            <div className='lt'>
               <h4>전년대비</h4>
               {(quarterData[selectedYear - 1]) ? ''
               : <p className='nodata'>( 전년도 내역이 없습니다. )</p>}
            </div>


            {tableData.map((o,i)=>
            <div className='tablediv' key={i}>
               <table>
                  <thead>
                     <tr>
                        <th scope="col">{o.title}</th>
                        <th scope="col">{selectedYear}년</th>
                        <th scope="col">{selectedYear-1}년</th>
                        <th scope="col">차액</th>
                        <th scope="col">증감률</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>입금</td>
                        <td>{comma(o.nowin)}</td>
                        <td>{comma(o.lastin)}</td>
                        <td>{comma(o.nowin - o.lastin)}</td>
                        <td className={o.ratein > 0 ? 'pl' : o.ratein < 0 ? 'mi' : ''}>{o.ratein}%</td>
                     </tr>
                     <tr>
                        <td>출금</td>
                        <td>{comma(o.nowout)}</td>
                        <td>{comma(o.lastout)}</td>
                        <td>{comma(o.nowout - o.lastout)}</td>
                        <td className={o.rateout > 0 ? 'pl' : o.rateout < 0 ? 'mi' : ''}>{o.rateout}%</td>
                     </tr>
                     <tr>
                        <td>총합</td>
                        <td>{comma(o.nowtotal)}</td>
                        <td>{comma(o.lasttotal)}</td>
                        <td>{comma(o.nowtotal - o.lasttotal)}</td>
                        <td className={o.ratetotal > 0 ? 'pl' : o.ratetotal < 0 ? 'mi' : ''}>{o.ratetotal}%</td>
                     </tr>
                  </tbody>
               </table>

            </div>
            )}
            </section>


         <p>{yearData[selectedYear].잔액 < 0 ? '" 출금이 많습니다. 절약을 고려해보세요! "'
            : yearData[selectedYear].잔액 < 1 ? '" 입금을 좀 더 늘려보세요! "'
            : '" 입금이 많습니다! 계속 이어가세요! "'
         }</p>

         <Link to='/transaction' 
            state={{ypage: false, y: selectedYear, m: 0 }}>
            {selectedYear}년 입출금내역 확인하기
         </Link>

         <AddButton/>  
      </div>
   )
}

export default Year