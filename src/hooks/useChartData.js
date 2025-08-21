import React, { useState } from 'react'

export const useChartData = (data) => {
   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
   const [isAll, setIsAll] = useState(0);

   const allMonth = {};

   if (data.length > 0) {
      data.forEach(({ date, money, type }) => {
         const year = new Date(date).getFullYear();
         const month = new Date(date).getMonth() + 1;
         if (!allMonth[year]) allMonth[year] = Array.from({ length: 12 }, () => ({ income: 0, expense: 0 }));
         if (type === "income") allMonth[year][month - 1].income += money;
         else if (type === "expense") allMonth[year][month - 1].expense += money;
      })
   } else {
      const year = new Date().getFullYear();
      allMonth[year] = Array.from({ length: 12 }, () => ({ income: 0, expense: 0 }));
   }

   return {
      selectedYear, setSelectedYear,
      isAll, setIsAll,
      allMonth
   }
}
