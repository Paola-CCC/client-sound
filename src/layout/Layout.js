import React from "react";
import Main from "./Main/Main.js";
import Footer from "./Footer/Footer.js";
import Header from "./Header/Header.js";
import "./Layout.scss"
import { useLocation } from "react-router-dom";

const Layout = () => {

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
};

export default Layout;
