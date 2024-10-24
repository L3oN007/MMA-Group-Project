import axios from "axios";

const http = axios.create({
  baseURL: "https://koi-api.uydev.id.vn/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;

