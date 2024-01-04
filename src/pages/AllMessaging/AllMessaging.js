import React, { useCallback, useContext, useEffect, useState } from "react";
import "./AllMessaging.scss";
import { ContainerSidebarAndContent } from "../../components";
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
  const [ isLoading, setIsLoading] = useState(null);


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
      console.error("text-error ", error);

    }
  }, [conversationAPI,userId]);

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
        checkMessages(recipientList[0].id,recipientList[0].username);
      }
    }, 1000);
  },[displayListRecipientClassic,displayListRecipientProfessor,checkMessages,userId,callAPIAppend,userRole,count,recipientList]);

  return (

      <>
          <div className="container-messenger">

            { isLoading  && (
              <LoadingElements />
            )}

            { (isLoading === false &&  recipientList.length === 0) && (
              <div className="recipient-empty" >
                <p> Il n'existe aucun message à afficher  </p>
              </div> 
            )}
          </div>
          

          { recipientList.length > 0  && (
                <ContainerSidebarAndContent>
                  <aside className="list-recipient">
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

                  <ConversationBox 
                    getTabListsOfConversation={tabListsOfConversation}
                    handleDisplayConversation={() => upDateMessagesConversation()}
                    currentConversation={conversationID}
                    destinataireName={destinataireName}
                  />
                </ContainerSidebarAndContent>
          )}
      </>






    
  );
};

export default AllMessaging;
