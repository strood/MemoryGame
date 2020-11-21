import React from 'react';

export default function Photo({ id, photographer, src, alt, handleClick }) {
  return (
    <div className='photoDiv' onClick={(e) => handleClick(e, id)}>
      <img src={src} alt={alt} />
      <p>Photo by: {photographer}</p>
    </div>
  );
}
