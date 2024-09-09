import {httpClient} from "../httpClient";

export const showAll = async () => {
  try {
    const response = await httpClient.get(`/courses`);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log('Erreur :', response);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des cours :', error);
  }
};

export const show = async (id) => {
  try {
    const response = await httpClient.get(`/courses/${id}`);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log('Erreur :', response);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du cours :', error);
  }
};

export const searching = async (data) => {
  try {
    const response = await httpClient.post(`/courses/search`, data);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log('Erreur :', response);
    }
  } catch (error) {
    console.error('Erreur lors de la recherche de cours :', error);
  }
};

export const showCourseByUser = async (userId) => {
  try {
    const response = await httpClient.get(`/progression-student/${userId}`);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log('Erreur :', response);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des cours par utilisateur :', error);
  }
};

export const showCourseListByProf = async (profId) => {
  try {
    const response = await httpClient.get(`/courses/professors/${profId}`);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log('Erreur :', response);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des cours par professeur :', error);
  }
};

export const showListCourseByInstrument = async (instrumentName) => {
  try {
    const response = await httpClient.get(`/courses/instruments/${instrumentName}`);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log('Erreur :', response);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des cours par instrument :', error);
  }
};

export const showCourseFiles = async (courseId) => {
  try {
    const response = await httpClient.get(`/course/${courseId}/fileuploads`);
    if (response.status >= 200 && response.status <= 299) {
      return response;
    } else {
      console.log('Erreur :', response);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des fichiers de cours :', error);
  }
};

export const deleteCourse = async (courseId) => {
  try {
    const response = await httpClient.delete(`/courses/${courseId}`);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log('Erreur :', response);
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du cours :', error);
  }
};



const CourseService = {
  showAll,
  show,
  searching,
  showCourseByUser,
  showCourseListByProf,
  showListCourseByInstrument,
  showCourseFiles,
  delete: deleteCourse

}

export default CourseService;
