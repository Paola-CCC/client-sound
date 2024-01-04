import React, { useContext, useState } from 'react'
import "./ConversationBox.scss";
import { Button } from '../../common/Index';
import { AuthContext } from "../../contexts/AuthContextProvider";
import { useAPIContext } from '../../contexts/APIContextProvider';


export const ConversationBox = ({getTabListsOfConversation,handleDisplayConversation,currentConversation,destinataireName}) => {

  const {  userId } = useContext(AuthContext);
  const [conversationText, setConversationText] = useState('');
  const { messageAPI } = useAPIContext();

  const handleSubmit = async (e) => {
    e.preventDefault() ;
    let datasMessage = {
      userId: userId ,
      content_Text: conversationText,
      conversationId : currentConversation
    };

    try {
      const response = await messageAPI.addMessage(datasMessage);
      if (response ) {
        setConversationText('');
      } else {
        console.log("Erreur lors de la récupération des données.");
      }
      handleDisplayConversation();
    } catch (error) {
      console.error(error);
    } 
  }

  const addMessage = () => {
    if(getTabListsOfConversation.length !== 0 ) {
      const datas =  Object.values(getTabListsOfConversation).map((value,index ) => {
        let username = value.author.firstName + " " + value.author.lastName;
        let userIdMessage = value.author.id;
        return( 
          <div  key={index} className={`messagerie-element ${ userIdMessage !== userId ? 'destinataire' : 'current-user'}` }>
            <div className="author-msg-image">
                <img
                  src="https://generations.fr/media/news/ciara-2015-.jpg"
                  alt="Impage Description"
                />
            </div>
            <div  className='container-msg-users-infos'>
              <div className="author-msg-infos">
                  <span className="author-msg-username"> 
                  {username && userIdMessage !== undefined && (
                    username
                  )}
                  </span>
                  <span className='date-msg'>
                    <small> {value.sentDate}</small>
                  </span>
              </div>
              <div className="messages-zone">
                    <p> {value.contentText} </p>
              </div>
            </div>
          </div>
        );
      });
    
      return datas;

    } else {
      return (
        <p> aucun message </p>
      )
    }
  }
  
  return (
    <div className='conversation-zone-container'>
      
        <div className='header-conversation'>
          <h5>{destinataireName && (
            destinataireName
          )}</h5>
        </div>
        <div className='main-area-conversation'>
          <div className="all-messages" >
            { addMessage()}
          </div>
        </div>
        <form onSubmit={handleSubmit} className='send-text-area' >
            <div className='chat-input-zone'>
              <textarea 
                id="chat-input" 
                placeholder="..."  
                value={conversationText} 
                onChange={(e) => setConversationText(e.target.value)} >
              </textarea>
            </div>
            <div className="btn-send" >
              <Button kind="primary" id="send-chat" >
                Envoyer
              </Button>
            </div>
        </form>
    </div>
  )
};

