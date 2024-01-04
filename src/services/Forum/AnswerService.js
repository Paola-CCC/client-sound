import AxiosClient from "../AxiosClient";

class AnswerService {
    
    constructor() {
        this.URL = process.env.REACT_APP_API_URL;
        this.httpClient = AxiosClient;
    }

    async addAnswerForum(forumId ,data)
    {
        try {
            const response = await this.httpClient.post(`${this.URL}/forums/${forumId}/new-response`,data);
            if (response.status >= 200 && response.status <= 299) {
                return response.data ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }


    async showCommentsOfCourse(forumId)
    {
        try {
            const response = await this.httpClient.get(`${this.URL}/forums/${forumId}/responses`);
            if (response.status >= 200 && response.status <= 299) {
                return response.data ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async deleteResponse(responseId)
    {
        try {
            const response = await this.httpClient.delete(`${this.URL}/response/${responseId}`);
            if (response.status >= 200 && response.status <= 299) {
                return response.data ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }
}
export default AnswerService ;