import React from 'react'

//리스트용 년월일구분
export const newData = (data) => {
   return data.map(item => {

      const dateObj = new Date(item.date);
      return {
      ...item,
      year: dateObj.getFullYear(),
      month: dateObj.getMonth() + 1,
      day: dateObj.getDate(),
      }
   });
}