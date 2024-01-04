import AxiosClient from "../AxiosClient";

class ForumService {

    constructor() {
        this.URL = process.env.REACT_APP_API_URL;
        this.httpClient = AxiosClient;
    }

    async addForum(data)
    {
        try {
            const response = await this.httpClient.post(`${this.URL}/new-forum`,data);
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
            const response = await this.httpClient.get(`${this.URL}/forums`);
            if (response.status >= 200 && response.status <= 299) {
                return response.data ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }


    async showAllByCategoryID(categoryId)
    {
        try {
            const response = await this.httpClient.get(`${this.URL}/forums-category/${categoryId}`);
            if (response.status >= 200 && response.status <= 299) {
                return response.data ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }


    async showAllBySubject(subjectName)
    {
        try {
            const response = await this.httpClient.get(`${this.URL}/forums-subject/${subjectName}`);
            if (response.status >= 200 && response.status <= 299) {
                return response.data ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async show(forumId)
    {
        try {
            const response = await this.httpClient.get(`${this.URL}/forums/${forumId}`);
            if (response.status >= 200 && response.status <= 299) {
                return response.data ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async showCategory()
    {
        try {
            const response = await this.httpClient.get(`${this.URL}/category/all`);
            if (response.status >= 200 && response.status <= 299) {
                return response.data ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async delete(forumId)
    {
        try {
            const response = await this.httpClient.delete(`${this.URL}/forums/${forumId}`);
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
export default ForumService;