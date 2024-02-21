import axios from "axios";

var conn = window.env
  ? window.env.REACT_APP_API_URL
  : window._env_
  ? window._env_.REACT_APP_API_URL
  : process.env.REACT_APP_API_URL || "http://localhost:4000/api/v1";
console.log(conn);

// creating an axios instance for the lost horizon api
export default axios.create({
  baseURL: conn,
  // baseURL: 'http://10.1.10.163:4000/api/v1',
  // baseURL: "http://localhost:4000/api/v1",
  headers: {
    // mode: "no-cors",
    "Access-Control-Allow-Origin": "*",
  },
});
