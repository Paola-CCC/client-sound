import React, { useContext } from 'react';
import './App.scss';
import { useLocation } from 'react-router-dom';
import { Footer, Header, Main } from './layout';
import { AuthContext } from './contexts/AuthContextProvider';

const App = () => {

  const { navbarMobileIsOpen } = useContext(AuthContext);

  const location = useLocation();

  return (
    <div id="layout-container" className={`${ navbarMobileIsOpen ? 'open' : ''}`}  >


      { navbarMobileIsOpen === false && (
          location.pathname !== "/" && location.pathname !== "courses" && (
            <Header />
          )
       )}
       
       { navbarMobileIsOpen && (
        <>
          <Header />
          <div className='cache-mobile'></div>
        </>
       )}
      <Main />
      <Footer />
    </div>
  );
}

export default App;