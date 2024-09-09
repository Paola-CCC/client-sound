import React, { useContext }  from 'react';
import './Header.scss';
import Navigation from '../../components/Navigation/Navigation';
import NavigationResponsive from '../../components/NavigationResponsive/NavigationResponsive';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logoImage from "../../assets/sound-symfo.png";
import { useLocation } from 'react-router-dom';
import HomeHero from '../../components/HomeHero/HomeHero';


const Header = () => { 
  const { navbarMobileIsOpen ,setNavbarMobileIsOpen } = useContext(AuthContext);
  const location = useLocation();

  return (
    
    <div className={`container-header`}>

          <div className={`navbar-mobile-isOpen`}>
            <button className='burger-menu'  onClick={() => setNavbarMobileIsOpen(true)}>
              <FontAwesomeIcon icon={faBars} size="2xl" />
            </button>
            <div className='logo-zone'>
            <img src={logoImage}  alt="img-logo" style={{width: "50px" , height:'50px'}}  />
            </div>
          </div>
          
        
        <header>
          { navbarMobileIsOpen === false ? (
            <>
              <Navigation />
            </>
            ):
            <NavigationResponsive />
          }
        </header>
        {(location.pathname === "/" || location.pathname === "courses") && (
              <HomeHero />               
        )}   
    </div>
)};

export default Header;
