import { httpClient } from "../httpClient";

const addForum = async (data) => {
  try {
    const response = await httpClient.post(`/new-forum`, data);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log('Erreur :', response);
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout du forum :', error);
  }
};

const showAll = async () => {
  try {
    const response = await httpClient.get(`/forums`);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log('Erreur :', response);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des forums :', error);
  }
};

const showAllByCategoryID = async (categoryId) => {
  try {
    const response = await httpClient.get(`/forums-category/${categoryId}`);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log('Erreur :', response);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des forums par catégorie :', error);
  }
};

const showForumSorted = async (datas) => {
  try {
    const response = await httpClient.post(`/forums-subject/search`, datas);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log('Erreur :', response);
    }
  } catch (error) {
    console.error('Erreur lors du tri des forums :', error);
  }
};

const showAllBySubject = async (subjectName) => {
  try {
    const response = await httpClient.get(`/forums-subject/${subjectName}`);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log('Erreur :', response);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des forums par sujet :', error);
  }
};

const show = async (forumId) => {
  try {
    const response = await httpClient.get(`/forums/${forumId}`);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log('Erreur :', response);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du forum :', error);
  }
};

const showCategory = async () => {
  try {
    const response = await httpClient.get(`/category/all`);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log('Erreur :', response);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories :', error);
  }
};

const deleteForum = async (forumId) => {
  try {
    const response = await httpClient.delete(`/forums/${forumId}`);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log('Erreur :', response);
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du forum :', error);
  }
};

const ForumService = {
  addForum,
  showAll,
  showAllByCategoryID,
  showForumSorted,
  showAllBySubject,
  show,
  showCategory,
  delete: deleteForum
};

export default ForumService;
