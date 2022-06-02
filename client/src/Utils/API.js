import axios from "axios";
export const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
}); //set base axios configuration.

export const getPostByName = (postName) =>
  API.get(`/search/${postName}`, postName); // fetch individual program data with computerName.
export const getPosts = API.get("/computers"); //simple function that hits endpoint.
