import React, { useCallback, useContext, useEffect, useState } from "react";
import "./AllMessaging.scss";
import { ConversationBox } from "../../components/ConversationBox/ConversationBox";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { useAPIContext } from "../../contexts/APIContextProvider";
import LoadingElements from "../../components/LoadingElements/LoadingElements";

const AllMessaging = () => {

  const { userId, userRole } = useContext(AuthContext);
  const { conversationAPI } = useAPIContext();
  const [ recipientList, setRecipientList ] = useState([]);
  const [ callAPIAppend, setCallAPIAppend ] = useState(false);
  const [ tabListsOfConversation, setTabListsOfConversation ] = useState([]);
  const [ conversationID, setConversationID ] = useState(0);
  const [ destinataireName, setDestinataireName ] = useState('');
  const [ count, setCount] = useState(0);
  const [ userSearchProf, setUserSearchProf] = useState([]);
  const [ userSearchClassic, setUserSearchClassic] = useState([]);
  const [ isLoading, setIsLoading] = useState(true);
  const [ canShowListUser, setCanShowListUser ] = useState(true);


  const [viewportDimensions, setViewportDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const strLcFirst = (value) => {
    return (value + "").charAt(0).toUpperCase() + value.substr(1);
  };

  const upDateMessagesConversation = useCallback(async () => {
    let datas;
    if (!(userRole.includes("ROLE_PROFESSOR"))) {
      datas = userSearchClassic ;
    }

    if (userRole.includes("ROLE_PROFESSOR")) {
      datas = userSearchProf ;
    }

    try {
      const response = await conversationAPI.addConversation(datas);
      const data = response;
      setCallAPIAppend(true);
      if(data[0].content && data[0].content !== undefined) {
        setTabListsOfConversation(data[0].content);
      }

    } catch (error) {
      console.error('text-error ', error);
    }
  },[conversationAPI, userRole, userSearchClassic ,userSearchProf ]);


  const checkMessages = useCallback((conversationId,username) => {

    let elementFiltrer = recipientList.filter((conversation) => conversation.id === conversationId );
    setTabListsOfConversation(elementFiltrer[0].message);
    setConversationID(elementFiltrer[0].id);
    setDestinataireName(username);
    setUserSearchProf({
        userOneId: elementFiltrer[0].destinataireId,
        userProfessorId: userId,
    });
    setUserSearchClassic({
        userOneId: userId,
        userProfessorId: elementFiltrer[0].destinataireId,
    });

    if( elementFiltrer.length > 0 ){
      setCanShowListUser(false);
    }

  },[recipientList,userId]);

  const displayListRecipientProfessor = useCallback(async () => {

    let datas =  { userProfessorId: parseInt(userId) };

    try {
        const data = await conversationAPI.getAllConversationForProfessor(datas);
        const recipientWithMessages = data.filter((recipient) => {
          return Object.values(recipient.message).length !== 0;
        });   
        
        setCallAPIAppend(true);
        const listUserClassic = Object.values(recipientWithMessages).map((e) => {
          return  {
            id: e.id,
            destinataireId: e.userOne.id,
            username: strLcFirst(e.userOne.firstName) + ' ' + e.userOne.lastName.toUpperCase(),
            photo: e.userOne.photo,
            message: e.message,
          };
        });
        setRecipientList(listUserClassic);
    } catch (error) {
      console.error("text-error ", error);
    }

  },[conversationAPI,userId]);

  const displayListRecipientClassic = useCallback(async () => {
    setIsLoading(true);

    let datas = { userOneId: userId };

    try {
        setIsLoading(false);
        const data = await conversationAPI.getAllConversationForStudent(datas);
        if( data && data.length > 0 ){
          setCallAPIAppend(true);
          const recipientWithMessages = data.filter((recipient) => {
            return Object.values(recipient.message).length !== 0;
          });       
          const datasProf = Object.values(recipientWithMessages).map((e) => {
            return  {
              id: e.id,
              destinataireId: e.userTwo.id,
              username: strLcFirst(e.userTwo.firstName) + ' ' + e.userTwo.lastName.toUpperCase(),
              photo: e.userTwo.photo,
              message: e.message
            };
          });
          setRecipientList(datasProf);
        }

    } catch (error) {
      setIsLoading(false);
      console.error("text-error ", error);

    }
  }, [conversationAPI,userId]);

  useEffect(() => {
    // Fonction de gestionnaire de redimensionnement
    const handleResize = () => {
      setViewportDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Ajouter un écouteur d'événement de redimensionnement lors du montage du composant
    window.addEventListener('resize', handleResize);

    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Assurez-vous de mettre une dépendance vide si vous souhaitez exécuter cela une seule fois après le rendu initial



  useEffect(() => {

    if (userId !== null && callAPIAppend === false && userRole !== null && !(userRole.includes("ROLE_PROFESSOR"))) {
      displayListRecipientClassic();
    }

    if (userId !== null && callAPIAppend === false && userRole !== null && userRole.includes("ROLE_PROFESSOR")) {
      displayListRecipientProfessor();
    }

    setTimeout(() => {

      if( count === 0 && recipientList.length !== 0 ) {
        setCount((count) => count + 1);
        if( viewportDimensions.width >= 900  ) {
          checkMessages(recipientList[0].id,recipientList[0].username);
        }

      }
    }, 1000);

  },[displayListRecipientClassic,displayListRecipientProfessor,checkMessages,userId,callAPIAppend,userRole,count,recipientList, canShowListUser ,viewportDimensions.width]);






  return (

      <>
          <div className="container-messenger">

            { isLoading  && (
              <LoadingElements />
            )}

            {/* { (isLoading === false &&  recipientList.length === 0) && (
              <div className="recipient-empty" >
                <p> Il n'existe aucun message à afficher  </p>
              </div> 
            )} */}

          { (recipientList.length > 0 && isLoading === false) && (
              <div className="grid-box-msg">
                <aside className={`list-recipient ${ canShowListUser ? 'open-list-user' : null }`}>
                  <div>
                    <span> Mes contacts
                      { recipientList.length > 0 && ( 
                        <small>  ({recipientList.length}) </small>
                      )}
                    </span>
                  </div>
                  <ul>
                    {Object.values(recipientList).map((recipient,index) => (
                      <li key={index} onClick={() => checkMessages(recipient.id, recipient.username)} tabIndex={0}>
                        <span className='recipient-name'>{recipient.username}</span>
                      </li>
                    ))}
                  </ul>
                </aside>

                  {(canShowListUser === false || viewportDimensions.width >= 900 ) && (
                        <ConversationBox 
                        handleReturnConversation={() => setCanShowListUser(!canShowListUser)}
                        getTabListsOfConversation={tabListsOfConversation}
                        handleDisplayConversation={() => upDateMessagesConversation()}
                        currentConversation={conversationID}
                        destinataireName={destinataireName}
                      />
                  )
                }
              </div>
          )}
          </div>
      </>
  );
};

export default AllMessaging;
