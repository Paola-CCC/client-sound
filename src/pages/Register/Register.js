import React, { useContext, useState, useEffect } from 'react';
import "./Register.scss";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../contexts/AuthContextProvider";
import { InputGroupCheckbox, InputText } from "../../common/Index";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Register = () => {

    const [firstname, setFirstname] = useState({ value : '' , isValid : null});
    const [lastname, setLastname] = useState({ value : '' , isValid : null});
    const [email, setEmail] = useState({ value : '' , isValid : null});
    const [selectedFile, setSelectedFile] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerification, setPasswordVerification] = useState('');
    const [passwordIsOK, setPasswordIsOK] = useState(null);
    const [instrumentList, setInstrumentList] = useState([]);
    const [selectedInstruments, setSelectedInstruments] = useState('');
    const [successRegister, setSuccessRegister] = useState(null);
    const navigate = useNavigate();
    const { setIsAuthenticated,setUserRole,setUserId,userAPI } = useContext(AuthContext);


    const allRegExp = {
        email: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
        firstname: /^[a-zA-ZÀ-ÿ'\- ]+$/,
        lastname: /^[a-zA-ZÀ-ÿ'\- ]+$/
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        let usersData  = {
            "firstName": firstname.value,
            "lastName": lastname.value,
            "username": firstname.value +' ' +lastname.value,
            "email": email.value,
            "password": password,
            "instruments": selectedInstruments,
        };

        if( passwordIsOK ) {
            try {
                const response = await userAPI.registerUser( usersData ) ;
                if (response && response.data.token !== '' && response.data.token !== undefined) {
                    let jwtDecoded = jwt_decode(response.data.token);
                    localStorage.setItem('jwt', JSON.stringify(response.data.token));
                    setUserId(jwtDecoded.userId);        
                    setUserRole(jwtDecoded.roles);
                    setIsAuthenticated(true);
                    setSuccessRegister(true);
                    navigate("/espace-personnel");
                } else {
                    console.log("Le Token Register est vide");
                }
        
            } catch (error) {
                console.error(error);
                setSuccessRegister(false);
            }
        }
    }



    const handleNameChange = (event , key) => {
        const isValidPattern = allRegExp[key].test(event);
        if ( key === 'firstname'){
            setFirstname({ value: event, isValid: isValidPattern  });
        } else if(key === 'lastname' ) {
            setLastname({ value: event, isValid: isValidPattern  });
        } else if(key === 'email' ) {
            setEmail({ value: event, isValid: isValidPattern  });
        };
    };

    const handlepassword = (event) => {
        setPassword(event);
        let checkData = event.search(new RegExp('^' + passwordVerification + '$', "g"));
        if( checkData !== -1 ){
            setPasswordIsOK(true);
        } else {
            setPasswordIsOK(false);
        }
    }

    const handlePasswordVerification = (event) => {
        setPasswordVerification(event);
        let checkData = password.search(new RegExp('^' + event + '$', "g"));
        if( checkData !== -1 ){
            setPasswordIsOK(true);
        } else {
            setPasswordIsOK(false);
        }
    
    }

    useEffect(() => {
        const displayInstruments = async () => {
          try {
              const response = await axios.get(process.env.REACT_APP_API_URL + `/instruments`);
              const dataInstruments = await response.data;
              let instrumentUserList = [];
              for (let i = 0; i < dataInstruments.length; i++) {
                const instrument = dataInstruments[i];
                const instrumentName = instrument.name;
                instrumentUserList.push(instrumentName);
              };
              setInstrumentList(instrumentUserList);
          } catch (error) {
              console.error(error);
          };
        }
        displayInstruments();
        
      }, [password ,passwordVerification ,passwordIsOK])


    return (
        <div className="form-register" >
            <form className='mx-auto' onSubmit={ handleSubmit }>
            <h1> Inscription </h1>
            <div className="mb-3">   
                <InputText 
                    label= {"Prénom"}   
                    value={firstname.value} 
                    onChange={(e) => handleNameChange(e.target.value ,'firstname')} 
                    id="firstname"
                    placeholder={"Prénom"} 
                    required= {true}
                    errorText={ firstname.isValid === false && firstname.value !== '' ? `Le prénom saisie n'est pas valide` : ''}
                />
            </div> 
            <div className="mb-3">

                <InputText 
                    label= {"Nom"}   
                    value={lastname.value} 
                    onChange={(e) => handleNameChange(e.target.value ,'lastname')} 
                    id="lastName"
                    placeholder={"Nom"} 
                    required= {true}
                    errorText={  lastname.isValid === false && lastname.value  ?   "Le nom saisie n'est pas valide" : "" }
                />
            </div>
            <div className="mb-3">

                <InputText 
                    label= {"Email"}   
                    value={email.value} 
                    onChange={(e) => handleNameChange(e.target.value ,'email')} 
                    id="email"
                    placeholder={"Adresse email"} 
                    required= {true}
                    errorText={ email.isValid === false && email.value  ?  "L'email est invalide"  : ""}
                />
            </div>
            <div className="mb-3">
            <InputGroupCheckbox
                options={instrumentList}
                selectedOptions={selectedInstruments}
                labelCheckboxGroup="Instruments"
                onChange={(selected) => setSelectedInstruments(selected)}
            />
            </div>
            <div className="mb-3">

                <InputText 
                    label= {"Mot de passe"}   
                    value={password} 
                    type="password"
                    onChange={(e) => handlepassword(e.target.value)} 
                    placeholder={"Mot de passe"} 
                    required= {true}
                    errorText={ passwordIsOK === false && ( passwordVerification !== "" && password !== "")  ? "Le mot de passe de vérification ne correspond pas" : ""}
                />

            </div>
            <div className="mb-3">
                <InputText 
                    label= {"Vérifier le mot de passe"}   
                    value={passwordVerification} 
                    type="password"
                    onChange={(e) => handlePasswordVerification(e.target.value)} 
                    placeholder={"Vérifier le mot de passe"} 
                    required= {true}
                    errorText={ passwordIsOK === false && ( passwordVerification !== "" && password !== "") ? "Le mot de passe de vérification ne correspond pas" : ""}
                />
            </div>
     
            <button type="submit" className="btn btn-primary"  >S'inscrire</button>
            <p className="link-btn">Vous avez déjà un compte ?  <Link  to="/connexion"> Se connecter </Link> </p>
            </form>
            {successRegister !== null && successRegister === false && (
                <div className={successRegister !== null && successRegister === false ? 'form-arror-msg show' : 'form-arror-msg hidden'}>
                <p>Les informations saisies ne nous permettent pas de vous inscrire.<br/> Veuillez recommencer.</p>
            </div>
            )}
        </div>
       
    )
}
 export default Register;