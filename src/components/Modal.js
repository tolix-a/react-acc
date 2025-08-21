import React, { useContext, useState } from 'react';
import '../css/Modal.css'
import { MyContext } from '../context/MyContext';
import comma from '../utils/comma';

function Popup( {content, btnName, title} ) {
   const {deleteData, resetData} = useContext(MyContext);
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const handleDelete = async () => {
      await deleteData(content.id);
      await setShow(false);
   }

   const handleReset = async () => {
      await resetData();
      await setShow(false);
   }
   
   

   return (
      <>
         <button onClick={handleShow} className='firstbtn'>{btnName}</button>

         {show && (
            <div className="modal-overlay" onClick={handleClose}>
               <div className="modal">
                  <div className="modal-header">
                     <h3 className="modal-header-title">{title}하시겠습니까?</h3>
                     <button className="close-button" onClick={handleClose}>X</button>
                  </div>
                  <div className="modal-body">
                     {content ? <>
                     <p className="modal-body-text">
                        {content.date}<br/>
                        {content.msg}
                     </p>
                     <p className="modal-body-text secondp">
                        {content.type === 'income' ? 
                        <span className='plus'>+ {comma(content.money)}원</span> 
                        : 
                        <span className='minus'>– {comma(content.money)}원</span>}
                     </p>
                     </> : <p className="modal-body-text">모든 데이터가 삭제됩니다.</p>
                     }
                  </div>
                  <div className="modal-footer">
                     {content ? 
                     <button className="btn-primary"
                     onClick={handleDelete}>예</button>
                     : <button className="btn-primary"
                     onClick={handleReset}>예</button>
                     }
                     <button className="btn-secondary"
                     onClick={handleClose}>아니오</button>
                  </div>
               </div>
            </div>
            )}
      </>
   );
}

export default Popup;