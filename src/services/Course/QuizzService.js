import {httpClient} from "../httpClient";

const showQuizz = async (courseId) => {
  try {
    const response = await httpClient.get(`/quizzes/course/${courseId}`);
    if (response.status >= 200 && response.status <= 299) {
      return response;
    } else {
      console.log("error message ", response);
    }
  } catch (error) {
    console.error(error);
  }
};

const addAnswers = async (quizzId, data) => {
  try {
    const response = await httpClient.post(
      `/quizzes/${quizzId}/add-response`,
      data
    );
    if (response.status >= 200 && response.status <= 299) {
      return response;
    } else {
      console.log("error message ", response);
    }
  } catch (error) {
    console.error(error);
  }
};

const QuizzService = {
  showQuizz,
  addAnswers,
};

export default QuizzService;
