import AxiosClient from "../AxiosClient";

class MessageService {

    constructor() {
        this.URL = process.env.REACT_APP_API_URL;
        this.httpClient = AxiosClient;
    }

    async showAll()
    {
        try {
            const response = await this.httpClient.get(`${this.URL}/all-messages`);
            if (response.status >= 200 && response.status <= 299) {
                return response ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }

  
    async show(messageId)
    {
        try {
            const response = await this.httpClient.get(`${this.URL}/message/${messageId}`);
            if (response.status >= 200 && response.status <= 299) {
                return response ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async addMessage(data)
    {
        try {
            const response = await this.httpClient.post(`${this.URL}/new-message`,data);
            if (response.status >= 200 && response.status <= 299) {
                return response ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async delete(messageId)
    {
        try {
            const response = await this.httpClient.delete(`${this.URL}/delete-message/${messageId}`);
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

export default MessageService;