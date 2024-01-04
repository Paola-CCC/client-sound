import React, { useState, useEffect, useContext } from "react";
import "./UpdateUsers.scss";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
import { InputFile, InputGroupCheckbox } from "../../common/Index";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpdateUsers = ({firstName,lastName,email,userId, instrument,handleCancel,roles, srcImg,altImg}) => {
  const [firstNameAPI, setFirstname] = useState(firstName);
  const [lastNameAPI, setLastname] = useState(lastName);
  const [emailAPI, setEmail] = useState(email);
  const [instrumentList, setInstrumentList] = useState([]);
  const [selectedInstruments, setSelectedInstruments] = useState(instrument);
  const [selectedFile, setSelectedFile] = useState('');
  const [successUpdateUser, setSuccessUpdateUser] = useState(null);
  const [successUpdateUserPic, setSuccessUpdateUserPic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userAPI } = useContext(AuthContext);


    const handleSubmit = async(e) => {
      e.preventDefault();
      let usersData = {
        firstName: firstNameAPI,
        lastName: lastNameAPI,
        email: emailAPI,
        instruments: selectedInstruments,
        role: roles
      };
      try {
        const response = await userAPI.updateUser(`/users/${userId}/edit`, usersData) ;
          if (response && response.data !== '' && response.data !== undefined ) {
            setSuccessUpdateUser(true);
            window.location.reload();
            setIsLoading(false); 
          } else {
            setSuccessUpdateUser(false);
            setIsLoading(false); 
          }
      } catch (error) {
        console.error(error);
        setSuccessUpdateUser(false);
        setIsLoading(false);
      }
    };

    const onFileChange = async(event) => {
      const file = event.target.files[0];

      if (!file) {
        console.error("No file selected");
        return;
      }

      setSelectedFile(file);
    };

    const updatePicture = async(e) => {
      e.preventDefault();

      if (!selectedFile) {
        console.error("No file selected");
        return;
      }

      const formData = new FormData();
      formData.append('imageFile', selectedFile, selectedFile.name);

      try {
        const response = await userAPI.updateUserPicture(`/uploadimage/new/user/${userId}`, formData);
          if (response && response.data !== '' && response.data !== undefined ) {
            setSuccessUpdateUserPic(true);
            window.location.reload();
            setIsLoading(false); 
          } else {
            setSuccessUpdateUserPic(false);
            setIsLoading(false); 
          }
      } catch (error) {
        console.error(error);
        setSuccessUpdateUserPic(false);
        setIsLoading(false); 
      }
    };

    useEffect(() => {
      const displayInstruments = async () => {
        setIsLoading(true); 
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
            setIsLoading(false); 
        } catch (error) {
          console.error(error);
          setIsLoading(false); 
        } 
      }
      displayInstruments();
    }, [selectedInstruments])

    if (isLoading ) {
    <p> La page est en train de charger</p>
    }

  return (
    <div className="form-update-user">
      <form className="form-update-user" onSubmit={handleSubmit} >
        <h4 className="form-h4"> Modifier mes informations </h4>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            Prénom :{" "}
          </label>
          <input
            type="text"
            placeholder="Prénom"
            className="form-control"
            id="firstName"
            required
            onChange={(e) => setFirstname(e.target.value)}
            value={firstNameAPI}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Nom :{" "}
          </label>
          <input
            type="text"
            placeholder="Nom"
            className="form-control"
            id="lastName"
            required
            onChange={(e) => setLastname(e.target.value)}
            value={lastNameAPI}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Adresse Email :{" "}
          </label>
          <input
            type="text"
            placeholder="Adresse Email"
            className="form-control"
            required
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={emailAPI}
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

        <div className="update-pic d-flex">
          <div className="img-profile">
            <img
              src={process.env.REACT_APP_API_URL + srcImg} alt={altImg}
            />
          </div>
          <div className="btn-pic">
            <div className="mb-3" >
                <InputFile onFileChange={ (e) => onFileChange(e)} />
            </div>
            <Button kind="primary" onClick={updatePicture} >
                Modifier la photo
            </Button>

          </div>
        </div>

        <div className="btn-group">
          <Button kind="secondary" onClick={handleCancel}>
            Annuler
          </Button>

          <Button kind="primary" type="submit" >
            <FontAwesomeIcon icon={faPaperPlane} />
            Mettre à jour
          </Button>
        </div>
      </form>
      {successUpdateUser === true && (
        <div> <p>Les informations ont bien été modifiées.</p> </div>
      )}
      {successUpdateUser === false && (
        <div> <p>La modification n'a pas été prise en compte. Veuillez réessayer.</p> </div>
      )}

      {successUpdateUserPic === true && (
        <div> <p>La photo de profil a été modifiée.</p> </div>
      )}
      {successUpdateUserPic === false && (
        <div> <p>La modification n'a pas été prise en compte. Veuillez réessayer.</p> </div>
      )}
    </div>
  );
};

UpdateUsers.propTypes = {};

UpdateUsers.defaultProps = {};

export default UpdateUsers;
