import AxiosClient from "../AxiosClient";

class ConversationService {

    constructor() {
        this.URL = process.env.REACT_APP_API_URL;
        this.httpClient = AxiosClient;
    }

    async addConversation(data)
    {
        try {
            const response = await this.httpClient.post(`${this.URL}/new-conversation`,data);
            if (response.status >= 200 && response.status <= 299) {
                return response.data ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }


    async getAllConversationForProfessor(data)
    {
        try {
            const response = await this.httpClient.post(`${this.URL}/conversation-professor`,data);
            if (response.status >= 200 && response.status <= 299) {
                return response.data ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async getAllConversationForStudent(data)
    {
        try {
            const response = await this.httpClient.post(`${this.URL}/conversation-student`,data);
            if (response.status >= 200 && response.status <= 299) {
                return response.data ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async showAll()
    {
        try {
            const response = await this.httpClient.get(`${this.URL}/all-conversations`);
            if (response.status >= 200 && response.status <= 299) {
                return response ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }

    
    async show(conversationId)
    {
        try {
            const response = await this.httpClient.get(`${this.URL}/conversation/${conversationId}`);
            if (response.status >= 200 && response.status <= 299) {
                return response ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async delete(conversationId)
    {
        try {
            const response = await this.httpClient.delete(`${this.URL}/delete-conversation/${conversationId}`);
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

export default ConversationService;