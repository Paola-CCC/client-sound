import { httpClient } from "../httpClient";

export const showAll = async () => {
  try {
    const response = await httpClient.get(`/subscriptions`);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log("error message ", response);
    }
  } catch (error) {
    console.error(error);
  }
};

const SubscriptionService = {
  showAll
};
export default SubscriptionService;
