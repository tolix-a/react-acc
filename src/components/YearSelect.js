import React from 'react'


const YearSelect = ({selectedYear, setSelectedYear, allMonth}) => {

   const handleYearChange = (e) => {
      setSelectedYear(Number(e.target.value));
   };   

   
   return (
      <select value={selectedYear} onChange={handleYearChange}>

      {Object.keys(allMonth).sort((a, b) => b - a ).map((year) => (
         <option key={year} value={year}>
            {year}년
         </option>
      ))}

      </select>
   )
}

export default YearSelect