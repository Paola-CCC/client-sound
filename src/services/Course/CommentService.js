import AxiosClient from "../AxiosClient";

class CommentService {

    constructor() {
        this.URL = process.env.REACT_APP_API_URL;
        this.httpClient = AxiosClient;
    }

    async showAll(courseId)
    {
        try {
            const response = await this.httpClient.get(`${this.URL}/courses/${courseId}/comments`);
            if (response.status >= 200 && response.status <= 299) {
                return response ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }

    //OK
    async addComment(courseId, userId, data)
    {
        try {
            const response = await this.httpClient.post(`${this.URL}/courses/${courseId}/user/${userId}/comment`, data );
            if (response.status >= 200 && response.status <= 299) {
                return response ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }

    //OK
    async deleteComment(courseId , userId , commentId)
    {
        try {
            const response = await this.httpClient.delete(`${this.URL}/courses/${courseId}/user/${userId}/comment/${commentId}`);
            if (response.status >= 200 && response.status <= 299) {
                return response ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }
    

}

export default CommentService;