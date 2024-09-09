import React, {  useEffect, useState } from "react";
import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useAuthContext } from "../../contexts/AuthContextProvider";
import InputText from "../../common/inputs/InputText/InputText";
import Button from "../../common/Button/Button";
import InputGroupCheckbox from "../../common/inputs/InputGroupCheckbox/InputGroupCheckbox";
import axios from "axios";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  // const [selectedFile, setSelectedFile] = useState('');
  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");
  const [instrumentList, setInstrumentList] = useState([]);
  const [successRegister, setSuccessRegister] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();
  const { setIsAuthenticated, setUserRole, setUserId, userAPI } =
    useAuthContext();

  // const allRegExp = {
  //     email: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
  //     firstname: /^[a-zA-ZÀ-ÿ'\- ]+$/,
  //     lastname: /^[a-zA-ZÀ-ÿ'\- ]+$/
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usersData = {
      firstName: firstname,
      lastName: lastname,
      username: firstname + " " + lastname,
      email: email,
      password: password,
      instruments: selectedOptions,
    };

    const response = await userAPI.register(usersData);

    if (
      response.data.token &&
      response.data.token !== "" &&
      response.data.token !== undefined
    ) {
      localStorage.setItem("jwt", JSON.stringify(response.data.token));
      setIsAuthenticated(true);
      let jwtDecoded = jwt_decode(response.data.token);
      setUserId(jwtDecoded.userId);
      setUserRole(jwtDecoded.roles);
      navigate("/courses-all");
    } else {
      setSuccessRegister(false);
      console.log("Le Token Register est vide");
    }
  };

  const handleCheckboxChange = (value) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  useEffect(() => {
    const displayInstruments = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + `/instruments`
        );
        const dataInstruments = await response.data;
        const instruments = dataInstruments?.map((e) => {
          let objtValue = {
            value: e.id,
            label: e.name,
          };
          return objtValue;
        });
        setInstrumentList([...instruments]);
      } catch (error) {
        console.error(error);
      }
    };
    displayInstruments();
  }, [password, passwordVerification,selectedOptions]);

  return (
    <div className="form-register">
      <form className="mx-auto" onSubmit={handleSubmit}>
        <h1> Inscription </h1>
        <div className="mb-3">
          <InputText
            label={"Prénom"}
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            name="firstname"
            placeholder={"Prénom"}
            isRequired={true}
          />
        </div>
        <div className="mb-3">
          <InputText
            label={"Nom"}
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            name="lastname"
            placeholder={"Nom"}
            isRequired={true}
          />
        </div>
        <div className="mb-3">
          <InputText
            label={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder={"Email"}
            isRequired={true}
          />
        </div>
        <div className="mb-3">
          <InputGroupCheckbox
            labelCheckboxGroup="Instruments"
            options={instrumentList}
            selectedOptions={selectedOptions}
            handleChange={(e) => handleCheckboxChange(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <InputText
            label={"Mot de passe"}
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"Mot de passe"}
            isRequired={true}
            errorText={""}
          />
        </div>
        <div className="mb-3">
          <InputText
            label={"Vérifier le mot de passe"}
            value={passwordVerification}
            type="password"
            onChange={(e) => setPasswordVerification(e.target.value)}
            placeholder={"Vérifier le mot de passe"}
            isRequired={true}
            errorText={""}
          />
        </div>

        <div className="mb-3">
          <Button type="submit" kind={"primary"} stylesBtn="mb-3">
            S'inscrire
          </Button>
        </div>

        <p className="link-btn">
          Vous avez déjà un compte ? <Link to="/connexion"> Se connecter </Link>{" "}
        </p>
      </form>
      {successRegister !== null && successRegister === false && (
        <div
          className={
            successRegister !== null && successRegister === false
              ? "form-arror-msg show"
              : "form-arror-msg hidden"
          }
        >
          <p>
            Les informations saisies ne nous permettent pas de vous inscrire.
            <br /> Veuillez recommencer.
          </p>
        </div>
      )}
    </div>
  );
};
export default Register;
