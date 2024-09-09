import { httpClient } from "../httpClient";

const getLikedByUser = async (data) => {
  try {
    const response = await httpClient.get(
      `/forum/${data.forumId}/like/${data.userId}`
    );
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log("Erreur :", response);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des likes :", error);
  }
};

const addLike = async (data) => {
  try {
    const response = await httpClient.get(
      `/like/${data.userInt}/forum/${data.forumId}`
    );
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log("Erreur :", response);
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout du like :", error);
  }
};

const addDislike = async (data) => {
  try {
    const response = await httpClient.get(
      `/dislike/${data.userInt}/forum/${data.forumId}`
    );
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log("Erreur :", response);
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout du dislike :", error);
  }
};

const LikeService = {
  getLikedByUser,
  addLike,
  addDislike,
};

export default LikeService;
