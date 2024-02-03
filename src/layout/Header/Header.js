import React, { useContext }  from 'react';
import './Header.scss';
import Navigation from '../../components/Navigation/Navigation';
import NavigationResponsive from '../../components/NavigationResponsive/NavigationResponsive';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logoImage from "../../assets/sound-symfo.png";


const Header = () => { 
  const { navbarMobileIsOpen ,setNavbarMobileIsOpen } = useContext(AuthContext);

  return (
  <header>

    { navbarMobileIsOpen === false && (
        <div className='navbar-mobile-isOpen'>
          <button className='burger-menu'  onClick={() => setNavbarMobileIsOpen(true)}>
            <FontAwesomeIcon icon={faBars} size="2xl" />
          </button>
          <div className='logo-zone'>
            <img src={logoImage}  alt="img-logo"   />
          </div>
        </div>
      )
    }

    { navbarMobileIsOpen === false ? (
      <Navigation />
       ):
      <NavigationResponsive />
    }
  </header>
)};

export default Header;
