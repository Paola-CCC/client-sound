import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
//import IconHome from '../../assets/svg/IconHome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../../contexts/AuthContextProvider';
import './NavigationResponsive.scss';
import { faRightFromBracket ,faMessage ,faUser, faUsers, faChalkboardUser, faPersonChalkboard,faXmark } from "@fortawesome/free-solid-svg-icons";
import logoImage from "../../assets/sound-symfo.png";
import { faBuffer } from '@fortawesome/free-brands-svg-icons';

const NavigationResponsive = () => {

    const {isAuthenticated,handleLogout,userRole ,username ,navbarMobileIsOpen ,setNavbarMobileIsOpen } = useContext(AuthContext);
    const [ subnavbarIsOpen, setSubnavbarIsOpen ] = useState(true);
    const location = useLocation();

    const getFirstLetters = (value) => {
    let username = value;
    let usernameStrimed = username.trim();
    username = usernameStrimed.split(' ');
    let firstname = Array.from(username[0])[0];
    let lastname = Array.from(username[username.length - 1])[0];
    return firstname + '' + lastname ;
    }


    return (
      
        <nav className={`${ navbarMobileIsOpen ? 'tablette-mobile ' : ''}`} >
          <div className='container-nav'>

          <div className='btn-close-mobile-navbar'>
             <button onClick={() => setNavbarMobileIsOpen(false)}>
                  <FontAwesomeIcon icon={faXmark} size="2xl" />                
             </button>
          </div>
          <Link to="/">
            <div className='logo-zone'>
                <img src={logoImage}  alt="img-logo" style={{width: "80px" , height:'80px'}}  />
            </div>
          </Link>
                
          <ul className={`navigation ${location.pathname !== '/' &&  location.pathname !== '/courses'  ? 'not-home' : '' }` }>

            { username && username !== undefined && (
            <li>
                <button onClick={() => setSubnavbarIsOpen(!subnavbarIsOpen)} tabIndex={0}>
                    <Link to="#" className='gestion' >
                    <FontAwesomeIcon icon={faUser} /> 
                    <span id="username" className='desktop'> { username && username !== undefined ? username : '' } </span>   
                    <span id="username" className='smartphone'> { username && username !== undefined ? getFirstLetters(username) : '' } </span>
                    <span className={`chevron ${ subnavbarIsOpen ? 'open' : ''}`} ></span>
                    </Link>
                </button>
            </li>
            )}

            { isAuthenticated !== true  ? (
              <li>
                <Link to="/offers">
                  <FontAwesomeIcon icon={faBuffer} />
                  Offres
                </Link>
              </li>
            ) : null }

            <li>
              <Link to="/courses-all">
                <FontAwesomeIcon icon={faPersonChalkboard} />
                Formations
              </Link>
            </li>
            <li>
              <Link to="/forum">
                <FontAwesomeIcon icon={faUsers} />
                Forum
              </Link>
            </li>
            { (isAuthenticated && isAuthenticated !== false && isAuthenticated !== null) && userRole.includes('ROLE_USER') && (
            <li>
              <Link to="/espace-apprentissage"> 
              <FontAwesomeIcon icon={faChalkboardUser} />
              Mes cours</Link>
            </li>
            )}
            
            { (isAuthenticated && isAuthenticated !== false && isAuthenticated !== null) && userRole.includes('ROLE_PROFESSOR') && (
            <li>
              <Link to="/espace-de-suivie">Espace de suivie</Link>
            </li>
            )}
           

        
    
            { !isAuthenticated  && (
              <li id="nav-user-profile" >
                  <button  tabIndex={0}>
                      <Link to="/connexion" >
                        <FontAwesomeIcon icon={faUser} />    
                        <span id="needAuth"> Connexion  </span>
                      </Link>
                  </button>
                </li>
            )}
    
            { isAuthenticated && (    
                  <li >
                    <Link to="/espace-personnel"> 
                      <FontAwesomeIcon icon={faUser} />
                      Espace personnel  
                    </Link> 
                  </li>
                  )}
                  {(isAuthenticated && isAuthenticated !== false && isAuthenticated !== null) && (
                  <li>
                    <Link to="/messagerie">
                    <FontAwesomeIcon icon={faMessage} />
                      Messagerie
                    </Link>
                  </li>
                  )}
                  {(isAuthenticated && isAuthenticated !== false && isAuthenticated !== null) && (
                  <li>
                    <Link to="/" onClick={handleLogout} >
                      <FontAwesomeIcon icon={faRightFromBracket} />
                      Se déconnecter
                    </Link>
                  </li> )}
          </ul>
          </div> 
        </nav>
    );
}


export default NavigationResponsive;