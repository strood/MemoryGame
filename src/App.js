import React from 'react';
import Nav from './components/Nav';
import Main from './components/Main';
import Modal from './components/Modal';
// import components

function App() {
  return (
    <>
      <Modal />
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
