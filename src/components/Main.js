import React, { useEffect } from 'react';
import { useGlobalContext } from '../context';
import Photo from './Photo';

export default function Main() {
  const {
    loadingInitial,
    currentPhotos,
    setCurrentPhotos,
    allPhotos,
    setAllPhotos,
    currentScore,
    setCurrentScore,
    highScore,
    setHighScore,
    clickedPhotos,
    setClickedPhotos,
    loadingError,
  } = useGlobalContext();

  const shuffleBoard = () => {
    let shuffleArray = currentPhotos;
    let ctr = shuffleArray.length;
    let temp;
    let index;
    // While there are elements in the array
    while (ctr > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * ctr);
      // Decrement ctr
      ctr--;
      // Swap last element w/ random index
      temp = shuffleArray[ctr];
      shuffleArray[ctr] = shuffleArray[index];
      shuffleArray[index] = temp;
    }
    setCurrentPhotos([...shuffleArray]);
  };

  //Swap a clicked photo, for an reserve photo
  const swapPhoto = async () => {
    // choose random photo from clicked list
    let index = Math.floor(Math.random() * clickedPhotos.length);
    let randoPhotoID = clickedPhotos[index];

    // remove from clickedPhotos
    await setClickedPhotos(clickedPhotos.filter((i) => i !== randoPhotoID));

    // remove it from currentPhotos, and add in a random new one from allphotos
    const filteredPhotos = currentPhotos.filter(
      (photo) => photo.id !== randoPhotoID
    );
    // randomize split in index to insert new photo
    let index2 = Math.floor(Math.random() * currentPhotos.length);
    await setCurrentPhotos([
      ...filteredPhotos.slice(0, index2),
      allPhotos[0],
      ...filteredPhotos.slice(index2),
    ]);
    // Remove from allPhotos
    await setAllPhotos(allPhotos.slice(1));
  };

  const handleClick = async (e, id) => {
    // If already clicked reset game and shuffle board
    if (clickedPhotos.includes(id)) {
      //check if new highscore
      if (currentScore > highScore) {
        localStorage.setItem('Highscore', JSON.stringify(currentScore));
        setHighScore(currentScore);
      }
      setCurrentScore(0);
      setClickedPhotos([]);
    } else {
      //increment game
      setCurrentScore(currentScore + 1);
      setClickedPhotos([...clickedPhotos, id]);
    }
  };

  useEffect(() => {
    if (currentPhotos.length === 0) {
      // Initial load, do nothing
    } else {
      if (currentScore > 12) {
        swapPhoto();
      }
      shuffleBoard();
    }
  }, [currentScore]);

  if (loadingInitial) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }
  if (loadingError) {
    return (
      <main>
        <h1>Error...</h1>
      </main>
    );
  } else {
    console.log(currentPhotos);
    console.log(allPhotos);
    return (
      <main>
        {currentPhotos.map((photo) => {
          return <Photo key={photo.id} {...photo} handleClick={handleClick} />;
        })}
      </main>
    );
  }
}
