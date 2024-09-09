import React, { useContext, useMemo } from 'react';
import { createContext, } from 'react';
import services from '../services';


const APIdatas = createContext();

const useAPIContext = () => useContext(APIdatas);

const APIdatasProvider = ({children}) => {

    const contextValue = useMemo(
      () => ({
        courseAPI : services.CourseService,
        commentAPI: services.CommentService,
        messageAPI: services.MessageService,
        conversationAPI: services.ConversationService,
        forumAPI: services.ForumService,
        answerAPI: services.AnswerService,
        likeAPI: services.LikeService,
        subscriptionAPI: services.SubscriptionService,
        userProgressionAPI : services.ProgressionService,
        quizzAPI: services.QuizzService
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