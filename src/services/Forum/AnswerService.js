import { httpClient } from "../httpClient";

export const addAnswerForum = async (forumId, data) => {
  try {
    const response = await httpClient.post(`/forums/${forumId}/new-response`, data);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log('Erreur :', response);
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la réponse :', error);
  }
};

export const showCommentsOfCourse = async (forumId) => {
  try {
    const response = await httpClient.get(`/forums/${forumId}/responses`);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log('Erreur :', response);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des commentaires du cours :', error);
  }
};

export const deleteResponse = async (responseId) => {
  try {
    const response = await httpClient.delete(`/response/${responseId}`);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log('Erreur :', response);
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de la réponse :', error);
  }
};


const AnswerService = {
    addAnswerForum,
    showCommentsOfCourse,
    deleteResponse
};

export default AnswerService;