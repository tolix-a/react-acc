import React, { createContext, useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import { reducer } from './reducer';

const MyContext = createContext();

function Context({children}){
   const[state, dispatch] = useReducer(reducer, { data: [] });
   const [isLoading, setIsLoading] = useState(true);

   const URL = process.env.REACT_APP_SERVER_URL;

   const fetchData = async () => {
      try {
         const res =  await axios.get(URL);
         dispatch({type: 'GET', payload: res.data});
      } catch (err) {
         // console.log('fetch 에러',err);
      } finally {
      setIsLoading(false);
      }
   }

   const addData = async (i) => {
      try {
         const res = await axios.post(URL, i);
         dispatch({type: 'ADD', payload: res.data});
      } catch (err) {
         // console.log('add 에러',err);
      }
   }

   const deleteData = async (id) => {
      try {
         await axios.delete(`${URL}/${id}`);
         dispatch({type: 'DELETE', payload: id});
      } catch (err) {
         // console.log('delete 에러',err);         
      }
   }

   const resetData = async () => {
      try {
         await axios.delete(`${URL}/reset`);
         await fetchData();
      } catch (err) {
         // console.log('reset 에러',err);         
      }
   }

   
   useEffect(()=>{ 
      fetchData();
   },[])


   if(isLoading)return(
      <div className="loading">
         <div className="spinner">
            <div className="inner-circle">★</div>
         </div>
      </div>
   )

   return(
      <MyContext.Provider  value={{ data: state.data, addData, deleteData, resetData}}>
         {children}
      </MyContext.Provider>
   )
}

export {MyContext, Context}