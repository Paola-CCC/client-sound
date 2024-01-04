import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import jwt_decode from "jwt-decode";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { InputText } from "../../common/Index";

const Login = () => {
  
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successLogin, setSuccessLogin] = useState(null);
  const { setIsAuthenticated, setUserRole, setUserId ,userAPI } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let element = {
      "email": email,
      "password": password
    };

    try {
      const response = await userAPI.loginUser( element ) ;
        if (response && response.data.token !== '' && response.data.token !== undefined ) {
          let jwtDecoded = jwt_decode(response.data.token);
          localStorage.setItem("jwt", JSON.stringify(response.data.token));
          setSuccessLogin(true);
          setUserRole(jwtDecoded.roles);
          setUserId(parseInt(jwtDecoded.userId));
          setIsAuthenticated(true);
          navigate("/espace-personnel");
        } else {
          console.log("token login est vide");
          setSuccessLogin(false);

        }

    } catch (error) {
      console.error(error);
      setSuccessLogin(false);

    }
  };

  return (
    <div className="form-login">
      <form className="mx-auto" onSubmit={handleSubmit}>
        <h1> Connexion </h1>

        <div className="mb-3">

            <InputText 
                label= {"Email"}   
                value={email} 
                onChange={(e) => setEmail(e.target.value ,'email')} 
                id="email"
                placeholder={"Adresse email"} 
                required= {true}
                errorText={ false  ?  "L'email est invalide"  : ""}
            />
        </div>
        <div className="mb-3">
          <InputText 
              label= {"Mot de passe"}   
              value={password} 
              type="password"
              onChange={(e) => setPassword(e.target.value)} 
              placeholder={"Mot de passe"} 
              required= {true}
              errorText={ false  ? "Le mot de passe de vérification ne correspond pas" : ""}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Se connecter
        </button>
        <p className="link-btn">
          Vous n'avez pas encore de compte ?
          <Link to="/inscription"> S'inscrire </Link>
        </p>
      </form>
      <div
        className={
          successLogin !== null && successLogin === false
            ? "form-arror-msg show"
            : "form-arror-msg hidden"
        }
      >
        <p>
          Votre Email et/ou Mot de passe sont incorrects.
          <br /> Veuillez recommencer.
        </p>
      </div>
    </div>
  );
};

export default Login;
