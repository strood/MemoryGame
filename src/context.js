import React, { useState, useContext, useEffect } from 'react';
import 'regenerator-runtime/runtime';
import { key, url, COLOR, QUERY, PER_PAGE } from './config';

const AppContext = React.createContext();

const getHighscore = () => {
  let highScore = localStorage.getItem('Highscore');
  if (highScore) {
    return JSON.parse(highScore);
  } else {
    return 0;
  }
};

const getRandomQuery = () => {
  return Math.floor(Math.random() * QUERY.length);
};

const cleanPhotos = (photoArray) => {
  // Start w/ 80 photos
  // Map into cleaner object structure, but only if id not already seen.
  let idTracker = [];
  const newPhotoArray = photoArray.map((photo) => {
    if (!idTracker.includes(photo.id)) {
      idTracker.push(photo.id);
      return {
        id: photo.id,
        alt: photo.url.split('/')[4],
        photographer: photo.photographer,
        src: photo.src.tiny,
      };
    }
    return null;
  });
  // End w/ 60 non-duplicate photos
  // Cleaned into objects we want info from
  return newPhotoArray.slice(0, 60);
};

const AppProvider = ({ children }) => {
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [highScore, setHighScore] = useState(getHighscore());
  const [currentScore, setCurrentScore] = useState(0);
  const [allPhotos, setAllPhotos] = useState([]);
  const [currentPhotos, setCurrentPhotos] = useState([]);
  const [clickedPhotos, setClickedPhotos] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const queryNo = getRandomQuery();

  const fetchPhotos = async () => {
    setLoadingInitial(true);
    try {
      const response = await fetch(
        `${url}${QUERY[queryNo]}&per_page=${PER_PAGE}&page=${pageNo}`,
        {
          headers: {
            Authorization: key,
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setAllPhotos([...allPhotos, ...cleanPhotos(data.photos)]);

        setLoadingInitial(false);
      }
    } catch (error) {
      console.log(`Load Error: ${error}`);
      setLoadingError(true);
      setLoadingInitial(false);
    }
  };

  useEffect(() => {
    console.log(allPhotos);
    if (allPhotos.length < 15) {
      setPageNo(pageNo + 1);
      fetchPhotos();
    }
    if (currentScore === 0) {
      setCurrentPhotos(allPhotos.splice(0, 16));
    }
  }, [allPhotos]);

  return (
    <AppContext.Provider
      value={{
        highScore,
        setHighScore,
        currentScore,
        setCurrentScore,
        loadingInitial,
        loadingError,
        currentPhotos,
        setCurrentPhotos,
        allPhotos,
        setAllPhotos,
        clickedPhotos,
        setClickedPhotos,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
