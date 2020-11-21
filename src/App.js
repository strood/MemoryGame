import React from 'react';
import Nav from './components/Nav';
import Main from './components/Main';
// import components

function App() {
  return (
    <>
      <Nav />
      <Main />
      <footer>
        <p>
          Created by <a href='www.github.com/strood'>Strood</a>
        </p>
        <a href='https://www.pexels.com'>Photos provided by Pexels</a>
      </footer>
    </>
  );
}

export default App;
