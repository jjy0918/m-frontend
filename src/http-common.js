import axios from "axios";

export default axios.create({
  baseURL: "http://3.140.153.179:8080/api",
  headers: {
    "Content-type": "application/json",
  },
});
