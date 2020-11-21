import React from 'react';
import { useGlobalContext } from '../context';

export default function Nav() {
  const { highScore, currentScore } = useGlobalContext();
  return (
    <nav>
      <div>
        <p>Try to click all the photos, without clicking the same one twice!</p>
      </div>
      <div>
        <h1>Memory Game</h1>
      </div>
      <div className='scoreDiv'>
        <h2>Score:</h2>
        <div>
          <h3>Current:</h3>
          <h3 className='score'>{String(currentScore)}</h3>
        </div>
        <div>
          <h3>Top:</h3>
          <h3 className='score'>{String(highScore)}</h3>
        </div>
      </div>
    </nav>
  );
}
