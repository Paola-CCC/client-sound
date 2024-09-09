import {httpClient} from "../httpClient";



export const showAllComments = async (courseId) => {
    try {
      const response = await httpClient.get(`/courses/${courseId}/comments`);
      if (response.status >= 200 && response.status <= 299) {
        return response.data;
      } else {
        console.log('Erreur :', response);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires :', error);
    }
  };
  
  export const addComment = async (courseId, userId, data) => {
    try {
      const response = await httpClient.post(`/courses/${courseId}/user/${userId}/comment`, data);
      if (response.status >= 200 && response.status <= 299) {
        return response.data;
      } else {
        console.log('Erreur :', response);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire :', error);
    }
  };
  
  export const deleteComment = async (courseId, userId, commentId) => {
    try {
      const response = await httpClient.delete(`/courses/${courseId}/user/${userId}/comment/${commentId}`);
      if (response.status >= 200 && response.status <= 299) {
        return response.data;
      } else {
        console.log('Erreur :', response);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire :', error);
    }
  };

const CommentService = {
    showAllComments,
    addComment,
    deleteComment
}

export default CommentService;