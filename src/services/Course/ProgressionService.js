import AxiosClient from "../AxiosClient";

class ProgressionService {

    constructor() {
        this.URL = process.env.REACT_APP_API_URL;
        this.httpClient = AxiosClient;
    }

    async addProgression(data)
    {
        try {
            const response = await this.httpClient.post(`${this.URL}/new-progression`,data);
            if (response.status >= 200 && response.status <= 299) {
                return response.data ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }


    async getAllProgressionForProfessor(data)
    {
        try {
            const response = await this.httpClient.post(`${this.URL}/progression-prof`,data);
            if (response.status >= 200 && response.status <= 299) {
                return response.data ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }

    // async getAllProgressionForStudent(data)
    // {
    //     try {
    //         const response = await this.httpClient.post(`${this.URL}/progression-student`,data);
    //         if (response.status >= 200 && response.status <= 299) {
    //             return response.data ;
    //         } else {
    //             console.log('error message ', response)
    //         }
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }


    async searchProgressionStudent(data)
    {
        try {
            const response = await this.httpClient.post(`${this.URL}/progression/student/search`,data);
            if (response.status >= 200 && response.status <= 299) {
                return response.data ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async updateOneProgression(data)
    {
        try {
            const response = await this.httpClient.put(`${this.URL}/update-progression`, data);
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
            const response = await this.httpClient.get(`${this.URL}/all-progression`);
            if (response.status >= 200 && response.status <= 299) {
                return response.data ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }

    
    async show(ProgressionId)
    {
        try {
            const response = await this.httpClient.get(`${this.URL}/progression/${ProgressionId}`);
            if (response.status >= 200 && response.status <= 299) {
                return response ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async delete(ProgressionId)
    {
        try {
            const response = await this.httpClient.delete(`${this.URL}/delete-progression/${ProgressionId}`);
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

export default ProgressionService;