import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../context/MyContext';

function Income(){

   return (
      <div className='new'>
         <h3>내역 추가</h3>
         <Insert/>
      </div>
   )
}


function Insert(){
   const {addData} = useContext(MyContext);
   const [info, setInfo] = useState({money:'', type:'', date:'', msg:''})
   const navigate = useNavigate();

   //천원 단위 콤마
   const [amount, setAmount] = useState('');
   function nostring (e){
      let onlyNumber = e.target.value.replace(/[^0-9]/g, '');

      if (parseInt(onlyNumber) === 0){
         onlyNumber = String(0);
      } else if (parseInt(onlyNumber) > 1000000000) {
         onlyNumber = String(1000000000);
      }

      onlyNumber = onlyNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      setAmount(onlyNumber);
   }

   function changeData(e){
      const { name, value } = e.target;

      if( name === 'money'){
         let str = value.replaceAll(',','');
         setInfo({ ...info, money: Number(str)});
      } else if (name === 'msg'){
         let str = value.slice(0,80);
         setInfo({ ...info, msg: str});
      } else {
         setInfo({ ...info, [name]: value});
      }
   }

   //제출
   const submitBtn = async (e) => {
      e.preventDefault();

      let id=Date.now();
      let add;

      if(info.money === 0){
         alert('1 이상의 금액을 입력해주세요.')
      } else if (info.msg.trim() === ''){
         alert('문자를 입력해주세요.')
      } else {
         add = {id, ...info};
      }

      await addData(add);
      await setInfo({ date: '', money: '', msg: '', type: '' });

      navigate(-1);
   }
   
   const handleReset = () =>{
      setInfo({ money:'', type:'', date:'', msg:'' });
      setAmount('');
   };
   
   function goback () {
      navigate(-1);
   }


   return(
      <form  onSubmit={submitBtn}>
         <ul>
            <li>
               <label>수입</label>
               <input type="radio" name="type" value="income" required
               checked={info.type === 'income'} onChange={changeData}></input>
               <label>지출</label>
               <input type="radio" name="type" value="expense" required
               checked={info.type === 'expense'} onChange={changeData}></input>
            </li>

            <li className='l2'>
               <label>날짜</label>
               <input type="date" name="date" required
               value={info.date} onChange={changeData}></input>
            </li>

            <li className='l2 l3'>
               <label>금액 <span>최대 10억 (1,000,000,000)</span></label>
               <input type="text" name="money" placeholder='0'
               value={amount} onChange={changeData}
               onInput={nostring} required></input>
            </li>

            <li className='l2 l3'>
               <label>메모 <span>({info.msg.length}/80)</span></label>
               <textarea type='text' name="msg" cols='50' rows='5'
               value={info.msg} onChange={changeData} required
               maxLength='80' placeholder='메모를 입력해주세요'></textarea>
            </li>

            <div>
               <button type='button' onClick={handleReset}>지우기</button>
            </div>
            
            <li className='nbtn'>
               <input type='submit' value='등록'/>
               <button type='button' onClick={goback}>취소</button>
            </li>
         </ul>
      </form>
   )
}



export default Income