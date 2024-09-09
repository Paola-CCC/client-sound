import { httpClient, httpClientFile } from "../httpClient";


export const login = async (dataUser) => {
  try {
    const response = await httpClient.post(`/api/login_check`, dataUser);
    if (response.status >= 200 && response.status <= 299) {
      return response;
    } else {
      console.log("error message ", response);
    }
  } catch (error) {
    console.error(error);
  }
};

export const register = async (dataUser) => {
  try {
    const response = await httpClient.post(`/api/register`, dataUser);
    if (response.status >= 200 && response.status <= 299) {
      return response;
    } else {
      console.log("error message ", response);
    }
  } catch (error) {
    console.error(error);
  }
};


export const updateUser = async (userId, dataUser) => {
  try {
    const response = await httpClient.put(`/users/${userId}/edit`, dataUser);
    if (response.status >= 200 && response.status <= 299) {
      return response;
    } else {
      console.log("error message ", response);
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateUserPicture = async (endpoint, userPicture) => {
  try {
    const response = await httpClientFile.post(`${endpoint}`, userPicture);
    if (response.status >= 200 && response.status <= 299) {
      return response;
    } else {
      console.log("error message ", response);
    }
  } catch (error) {
    console.error(error);
  }
};


export const show = async (userId) => {
  try {
    const response = await httpClient.get(`/user/${userId}`);
    if (response.status >= 200 && response.status <= 299) {
      return response;
    } else {
      console.log("error message ", response);
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await httpClient.delete(`/users/${userId}`);
    if (response.status >= 200 && response.status <= 299) {
      return response;
    } else {
      console.log("error message ", response);
    }
  } catch (error) {
    console.error(error);
  }
};

const UserService = {
  login,
  register,
  updateUser,
  updateUserPicture,
  show,
  delete: deleteUser
};

export default UserService;
