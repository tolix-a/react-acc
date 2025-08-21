import React from 'react'

const comma = (num) => {
   let thousand = (num ?? 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   return thousand;
}


export default comma