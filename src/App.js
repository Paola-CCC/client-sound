import React, { useContext } from 'react';
import './App.scss';
import { Footer, Header, Main } from './layout';
import { AuthContext } from './contexts/AuthContextProvider';

const App = () => {

  const { navbarMobileIsOpen } = useContext(AuthContext);


  return (
    <div id="layout-container" className={`${ navbarMobileIsOpen ? 'open' : ''}`}  >
       <Header />
       { navbarMobileIsOpen && (
        <>
          <div className='cache-mobile'></div>
        </>
       )}
      <Main />
      <Footer />
    </div>
  );
}

export default App;