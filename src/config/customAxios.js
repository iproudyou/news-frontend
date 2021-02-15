import axios from "axios";
import Cookies from "js-cookie";

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URI,
  headers: {
    Authorization: "Bearer " + Cookies.get("x_auth_access"),
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

export default customAxios;
