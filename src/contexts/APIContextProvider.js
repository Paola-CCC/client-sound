import React, { useContext, useMemo } from 'react';
import { createContext, } from 'react';
import services from '../services';


const APIdatas = createContext();

const useAPIContext = () => useContext(APIdatas);

const APIdatasProvider = ({children}) => {

    const contextValue = useMemo(
      () => ({
        courseAPI : new services.CourseService(),
        commentAPI: new services.CommentService(),
        messageAPI: new services.MessageService(),
        conversationAPI: new services.ConversationService(),
        forumAPI: new services.ForumService(),
        answerAPI: new services.AnswerService(),
        likeAPI: new services.LikeService(),
        subscriptionAPI: new services.SubscriptionService(),
        userProgressionAPI : new services.ProgressionService(),
        quizzAPI: new services.QuizzService()
      }),
      []
    );

    return (
        <APIdatas.Provider value={contextValue}>
          {children}
        </APIdatas.Provider>
    );
}

export  { useAPIContext, APIdatasProvider} ;