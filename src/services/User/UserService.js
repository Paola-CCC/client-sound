import AxiosClient from "../AxiosClient";

class UserService 
{

    constructor() {
        this.URL = process.env.REACT_APP_API_URL;
        this.httpClient = AxiosClient;
    }
    //OK
    async loginUser (dataUser) {
        try {
            const response = await this.httpClient.post(`${this.URL}/api/login_check`, dataUser);
            if (response.status >= 200 && response.status <= 299) {
                return response ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    };
    //OK
    async registerUser (dataUser) {
        try {
            const response = await this.httpClient.post(`${this.URL}/api/register`, dataUser);
            if (response.status >= 200 && response.status <= 299) {
                return response ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    };

    //OK
    async updateUser(endpoint, dataUser) {
        try {
            const response = await this.httpClient.put(`${this.URL}${endpoint}`, dataUser);
            if (response.status >= 200 && response.status <= 299) {
                return response ;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async updateUserPicture(endpoint, userPicture){
        try {
            const response = await this.httpClient.postFile(`${this.URL}${endpoint}`, userPicture);
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
    async show(userId)
   {
       try {
           const response = await this.httpClient.get(`${this.URL}/users/${userId}`);
           if (response.status >= 200 && response.status <= 299) {
               return response ;
           } else {
               console.log('error message ', response)
           }
       } catch (error) {
           console.error(error)
       }
   }
    async delete(userId)
    {
        try {
            const response = await this.httpClient.delete(`${this.URL}/users/${userId}`);
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

export default UserService;