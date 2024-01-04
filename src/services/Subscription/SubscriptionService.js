import AxiosClient from "../AxiosClient";

class SubscriptionService {

    constructor() {
        this.URL = process.env.REACT_APP_API_URL;
        this.httpClient = AxiosClient;
    }

    async showAll() {
        try {
          const response = await this.httpClient.get(`${this.URL}/subscriptions`);
          if (response.status >= 200 && response.status <= 299) {
            return response.data;
          } else {
            console.log("error message ", response);
          }
        } catch (error) {
          console.error(error);
        }
    }
}

export default SubscriptionService;