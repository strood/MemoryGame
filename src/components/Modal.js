import React from 'react';
import { useGlobalContext } from '../context';

export default function Modal() {
  const { modalStatus, setModalStatus } = useGlobalContext();
  return (
    <div className={modalStatus ? 'modal' : 'modal hide'}>
      <div className='modalDiv'>
        <div>
          <h1>OOPS!</h1>
          <h2>Already clicked that one!</h2>
          <button onClick={() => setModalStatus(false)}>Try Again!</button>
        </div>
      </div>
    </div>
  );
}
