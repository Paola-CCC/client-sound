import React, {  useCallback, useEffect, useMemo } from 'react';
import { createContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import services from '../services';

const AuthContext = createContext();

/** 
 * Context Provider va être utiliser pour délimiter les composants enfants qui pourront accéder à ses informations càd aux variables ci-dessous.
*/
const AuthContextProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState([]);
    const [username, setUsername] = useState('');

    const navigate = useNavigate();
    const token = localStorage.getItem('jwt')  ?  localStorage.getItem('jwt') : '';
    const usernameStored = localStorage.getItem('username') ?  localStorage.getItem('username') : '';


    /** Retire JWT du localstorage et change la variable du context */
    const handleLogout = useCallback(() => {
      if (localStorage.getItem('jwt')) {
        localStorage.removeItem("jwt");
        localStorage.removeItem("username");
        setIsAuthenticated(false);
        setUserId(null);
        setUserRole([]);
        setUsername('');
      }
      navigate('/');

    }, [navigate]);

    
    const isJWTinlocalStorage = useCallback(() => {
      if (!localStorage.getItem('jwt')) {
        return false;
      } else {
        return true;
      }
    }, []);

    useEffect(() => {
      setIsAuthenticated(isJWTinlocalStorage());

      if( isAuthenticated ){
        let jwtDecoded  = jwt_decode(JSON.parse(token));
        setUserId(parseInt(jwtDecoded.userId));
        setUserRole(jwtDecoded.roles);
        setUsername(usernameStored);
      }

    }, [isJWTinlocalStorage ,token,userId,isAuthenticated,usernameStored ]);

  
    /** Permet de stocker les variables du context getter et leur mutateur - fonction qui changent la/les valeurs  */
    const contextValue = useMemo(
      () => ({
        isAuthenticated,
        setIsAuthenticated,
        userId,
        setUserId,
        userRole,
        setUserRole,
        username,
        setUsername,
        handleLogout,
        userAPI: new services.UserService()
      }),
      [isAuthenticated, userId, userRole , username ,handleLogout]
    );

    return (
        <AuthContext.Provider value={contextValue}>
          {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthContextProvider} ;