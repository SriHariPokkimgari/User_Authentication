import axios from "axios";

const instance = axios.create({
  baseURL: "https://user-authentication-xjk8.onrender.com",
});

export default instance;
