import AxiosClient from "../AxiosClient";

class QuizzService {
  
  constructor() {
    this.URL = process.env.REACT_APP_API_URL;
    this.httpClient = AxiosClient;
  }


  async showQuizz(courseId) {
    try {
      const response = await this.httpClient.get(`${this.URL}/quizzes/course/${courseId}`);
      if (response.status >= 200 && response.status <= 299) {
        return response;
      } else {
        console.log("error message ", response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async addAnswers(quizzId,data) {
    try {
      const response = await this.httpClient.post(`${this.URL}/quizzes/${quizzId}/add-response`,data);
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

export default QuizzService;
