import axios from "axios";

const { REACT_APP_API_BASE_URL: baseURL, REACT_APP_AUTH_TOKEN: token } =
  process.env;

const API = axios.create({
  baseURL: baseURL || "http://localhost:3001/api/v1",
  headers: {
    common: { Authorization: `Bearer ${token}` },
  },
});

export default API;
