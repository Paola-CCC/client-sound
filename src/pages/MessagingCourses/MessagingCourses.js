import React, {  useCallback, useContext, useEffect, useState } from 'react'
import './MessagingCourses.scss';
import { ConversationBox } from '../../components/ConversationBox/ConversationBox';
import { AuthContext } from "../../contexts/AuthContextProvider";
import { useAPIContext } from '../../contexts/APIContextProvider';
import { useNavigate, useParams } from 'react-router-dom';

const MessagingCourses = () =>  {

  const { courseId } = useParams() ;
  const { professorId } = useParams() ;
  const { userId } = useContext(AuthContext);
  const { conversationAPI } = useAPIContext();
  const [ destinataireDatas, setDestinataireDatas] = useState({});
  const [ callAPIAppend, setCallAPIAppend] = useState(false);
  const [ tabListsOfConversation , setTabListsOfConversation] = useState([]);
  const [ currentConversation, setCurrentConversation] = useState(0);
  const [ count, setCount] = useState(0);
  const navigate = useNavigate();



  const displayConversation = useCallback(async () => {
    const datas =  {
      userOneId: userId,
      userProfessorId: parseInt(professorId),
    };

    try {
      
      const response = await conversationAPI.addConversation(datas);
      const data = response;
      setCallAPIAppend(true);

      if (data[0].conversationId) {
        setCurrentConversation(data[0].conversationId);
      }

      if( data[0].content && data[0].content !== undefined) {
        setTabListsOfConversation(data[0].content);
      }

      if (data[0].authorOneId.id === userId) {
        setDestinataireDatas({
          username: `${data[0].authorTwoId.firstName} ${data[0].authorTwoId.lastName}`,
          photoUser: data[0].authorTwoId.photo
        })
      } else {
        setDestinataireDatas({
          username: `${data[0].authorOneId.firstName} ${data[0].authorOneId.lastName}`,
          photoUser: data[0].authorOneId.photo
        })
      }
      
    } catch (error) {
      console.error('text-error ', error);
    }
  },[conversationAPI, professorId, userId]);


useEffect(() => {

  if ( userId !== null && callAPIAppend === false && Object.values(destinataireDatas).length === 0 && count === 0 ) {
    displayConversation();
    setCount((count) => count + 1);
  }

},[displayConversation, userId ,callAPIAppend ,destinataireDatas ,count])

  return (
    <div className='grid-box-msg messages-course'>

        <ConversationBox 
          getTabListsOfConversation={tabListsOfConversation}
          handleDisplayConversation={() => displayConversation()}
          currentConversation={currentConversation}
          destinataireName={destinataireDatas.username}
          handleReturnConversation={() => navigate(`/courses/${courseId}`)}
        />
    </div>
)};


export default MessagingCourses;
