import AxiosClient from "../AxiosClient";

class LikeService {

    constructor() {
        this.URL = process.env.REACT_APP_API_URL;
        this.httpClient = AxiosClient;
    }

    async getLikedByUser(data) {
        try {
            const response = await this.httpClient.get(`${this.URL}/forum/${data.forumId}/like/${data.userId}`);
            if (response.status >= 200 && response.status <= 299) {
                return response.data;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }


    async addLike(data) {
        try {
            const response = await this.httpClient.get(`${this.URL}/like/${data.userInt}/forum/${data.forumId}`);
            if (response.status >= 200 && response.status <= 299) {
                return response.data;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async addDislike(data) {
        try {
            // /like/{userId}/forum/{id}
            const response = await this.httpClient.get(`${this.URL}/dislike/${data.userInt}/forum/${data.forumId}`);
            if (response.status >= 200 && response.status <= 299) {
                // console.log({response})
                return response.data;
            } else {
                console.log('error message ', response)
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export default LikeService;