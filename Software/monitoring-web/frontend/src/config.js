import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://homemonitoring-web.herokuapp.com/",
});
