import CourseService from './Course/CourseService';
import CommentService from './Course/CommentService';
import QuizzService from './Course/QuizzService';
import ProgressionService from './Course/ProgressionService';
import MessageService from './Messaging/MessageService';
import ConversationService from './Messaging/ConversationService';
import UserService from './User/UserService';
import ForumService from './Forum/ForumService';
import AnswerService from './Forum/AnswerService';
import SubscriptionService from './Subscription/SubscriptionService';
import LikeService from './Forum/LikeService';

const services = {
    CourseService,
    CommentService,
    MessageService,
    ConversationService,
    UserService,
    ForumService,
    AnswerService,
    LikeService,
    SubscriptionService,
    ProgressionService,
    QuizzService
  };
  
  export default services;



