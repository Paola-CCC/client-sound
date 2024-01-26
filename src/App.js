import React from 'react';
import './App.scss';
import { useLocation } from 'react-router-dom';
import { Footer, Header, Main } from './layout';

const App = () => {

  const location = useLocation();

  return (
    <div id="layout-container">
       { location.pathname !== "/" && location.pathname !== "courses" && (
        <Header />
       )}
      <Main />
      <Footer />
    </div>
  );
}

export default App;