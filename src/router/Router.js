import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  NotFound,
  Homepage,
  Offers,
  PersonalSpace,
  ForumTopicsList,
  CourseById,
  ListLearningTracking,
  ListStudentsTracking,
  MessagingCourses,
  ListAllCourses,
  Login,
  Register,
  About,
  AllMessaging,
  ForumTopicById
} from "../pages/index.js";
import { ProtectedRoute } from "../components";
import Quizz from "../pages/Quizz/Quizz.js";

const RouterNav = () => {
  return (
    <Routes>
        <Route index path="/" element={<Homepage />} />
        <Route path="courses" element={<Homepage />} />
        <Route path="connexion" element={<Login />} />
        <Route path="inscription" element={<Register />} />
        <Route path="about" element={<About />} />
        <Route path="offers" element={<Offers />} />
        <Route path="*" element={<NotFound />} />
        <Route path="forum" element={<ForumTopicsList />} />
        <Route path="forum/:forumId" element={<ForumTopicById />} />
        <Route path="courses-all" element={<ListAllCourses /> }  />
        <Route element={<ProtectedRoute />}>
            <Route path="espace-apprentissage" element={ < ListLearningTracking />} />
            <Route path="espace-de-suivie" element={ < ListStudentsTracking /> } />
            <Route path="espace-personnel" element={<PersonalSpace />} />
            <Route path="messagerie" element={<AllMessaging />} />
            <Route path="courses/:courseId" element={<CourseById /> }  />
            <Route path="courses/:courseId/:professorId" element={<MessagingCourses /> }  />
            <Route path="courses/quizz/:courseId" element={<Quizz /> }  />
        </Route>
      </Routes>
  );
};

export default RouterNav;
