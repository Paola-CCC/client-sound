import axios from "axios";

const token = localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")) : "";

const AxiosClient = {
  async get(url) {
    return await axios.get(url, {
      credentials: "include",
      withCredentials: true,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    } );
  },

  async post(url, data) {
    return await axios.post(url, data  , {
      credentials: "include",
      withCredentials: true,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async postFile(url, data) {
    return await axios.post(url, data  , {
      credentials: "include",
      withCredentials: true,
      mode: "cors",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async put(url, data) {
    return await axios.put(url, data,{
      credentials: "include",
      withCredentials: true,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
  },

  async delete(url) {
    return await axios.delete(url, {
      credentials: "include",
      withCredentials: true,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default AxiosClient;
