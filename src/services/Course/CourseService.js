import AxiosClient from "../AxiosClient";

class CourseService {
  
  constructor() {
    this.URL = process.env.REACT_APP_API_URL;
    this.httpClient = AxiosClient;
  }

  async showAll() {
    try {
      const response = await this.httpClient.get(`${this.URL}/courses`);
      if (response.status >= 200 && response.status <= 299) {
        return response.data;
      } else {
        console.log("error message ", response);
      }
    } catch (error) {
      console.error(error);
    }
  }


  async show(id) {
    try {
      const response = await this.httpClient.get(`${this.URL}/courses/${id}`);
      if (response.status >= 200 && response.status <= 299) {
        return response.data;
      } else {
        console.log("error message ", response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async searching(data) {
    try {
      const response = await this.httpClient.post(`${this.URL}/courses/search`,data);
      if (response.status >= 200 && response.status <= 299) {
        return response.data;
      } else {
        console.log("error message ", response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // ESPACE D'APPRENTISSAGE
  async showCourseByUser(userId) {
    try {
      const response = await this.httpClient.get(`${this.URL}/api/progression-student/${userId}`);
      if (response.status >= 200 && response.status <= 299) {
        return response.data;
      } else {
        console.log("error message ", response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // ESPACE DE SUIVIE PROF
  async showCourseListByProf(profId)
  {
    try {
      const response = await this.httpClient.get(`${this.URL}/courses/professors/${profId}`);
      if (response.status >= 200 && response.status <= 299) {
        return response.data;
      } else {
        console.log("error message ", response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Trie des cours avec un instrument
  async showListCourseByInstrument(instrumentName)
  {
    try {
      const response = await this.httpClient.get(`${this.URL}/courses/instruments/${instrumentName}`);
      if (response.status >= 200 && response.status <= 299) {
        return response;
      } else {
        console.log("error message ", response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // récuperer les documents par cours
  async showCourseFiles(courseId)
  {
    try {
      const response = await this.httpClient.get(`${this.URL}/course/${courseId}/fileuploads`);

      if (response.status >= 200 && response.status <= 299) {
        return response;
      } else {
        console.log("error message ", response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async delete(courseId) {
    try {
      const response = await this.httpClient.delete(`${this.URL}/courses/${courseId}`);
      if (response.status >= 200 && response.status <= 299) {
        return response;
      } else {
        console.log("error message ", response);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default CourseService;
