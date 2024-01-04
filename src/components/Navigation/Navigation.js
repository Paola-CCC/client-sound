import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import IconHome from '../../assets/svg/IconHome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from '../../contexts/AuthContextProvider';
import './Navigation.scss';

const Navigation = () => {
const {isAuthenticated,handleLogout,userRole ,username} = useContext(AuthContext);
const [ subnavbarIsOpen, setSubnavbarIsOpen ] = useState(false);

const location = useLocation();

const handleBlur = () => {
  setTimeout(() => {
    setSubnavbarIsOpen(false);
  }, 500)
};

const getFirstLetters = (value) => {
  let username = value;
  let usernameStrimed = username.trim();
  username = usernameStrimed.split(' ');
  let firstname = Array.from(username[0])[0];
  let lastname = Array.from(username[username.length - 1])[0];
  return firstname + '' + lastname ;
}


return (
  
    <nav>

      <div className='container-nav'>
      {/* <MenuResponsive /> */}
      <Link to="/">
          <IconHome />
      </Link>

      <ul className={`navigation ${location.pathname !== '/' &&  location.pathname !== '/courses'  ? 'not-home' : '' }` }>
        <li>
          <Link to="/courses-all">Formations</Link>
        </li>
        <li>
          <Link to="/forum">Forum</Link>
        </li>
        { (isAuthenticated && isAuthenticated !== false && isAuthenticated !== null) && userRole.includes('ROLE_USER') && (
        <li>
          <Link to="/espace-apprentissage"> Mes cours</Link>
        </li>
        )}
        
        { (isAuthenticated && isAuthenticated !== false && isAuthenticated !== null) && userRole.includes('ROLE_PROFESSOR') && (
        <li>
          <Link to="/espace-de-suivie">Espace de suivie</Link>
        </li>
        )}
       
        { isAuthenticated !== true  ? (
          <li>
            <Link to="/offers">Offres</Link>
          </li>
        ) : null }
    

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

        <li className="dropdown"  tabIndex={0}  style={{ display: (isAuthenticated && isAuthenticated !== false && isAuthenticated !== null) ? "block" : "none" }} onBlur={handleBlur} >
          <button onClick={() => setSubnavbarIsOpen(!subnavbarIsOpen)} tabIndex={0}>

              <Link to="#" className='gestion' >
                <FontAwesomeIcon icon={faUser} /> 
                <span id="username" className='desktop'> {username && username !== undefined ? username : ''  }    </span>   
                <span id="username" className='smartphone'> {username && username !== undefined ? getFirstLetters(username) : ''  }    </span>
                <span className={`chevron ${ subnavbarIsOpen ? 'open' : ''}`} ></span>
              </Link>
          </button>

          <ul className={`sub-menu ${ subnavbarIsOpen ? 'open' : ''}`}  tabIndex={0} >
              { isAuthenticated && (    
                <li >
                  <Link to="/espace-personnel"> Espace personnel  </Link> 
                </li>
              )}
              {(isAuthenticated && isAuthenticated !== false && isAuthenticated !== null) && (
              <li>
                <Link to="/messagerie">Messagerie</Link>
              </li>
              )}
              {(isAuthenticated && isAuthenticated !== false && isAuthenticated !== null) && (
              <li>
                <Link to="/" onClick={handleLogout} >
                Se déconnecter
                </Link>
              </li> )}
          </ul>
        </li>
      </ul>
      </div> 
    </nav>
);}

Navigation.propTypes = {};

Navigation.defaultProps = {};

export default Navigation;
