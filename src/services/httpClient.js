import axios from "axios";

const URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")) : "";

const httpClient = axios.create({
  baseURL: URL,
  credentials: "include",
  withCredentials: true,
  mode: "cors",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Authorization: `Bearer ${token}`,
  },
});

const httpClientFile = axios.create({
  baseURL: URL,
  credentials: "include",
  withCredentials: true,
  mode: "cors",
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
});


export { httpClient, httpClientFile };