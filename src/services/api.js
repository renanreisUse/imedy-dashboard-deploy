import axios from "axios";

const api = () => {
  let token = localStorage.getItem("token");

  const axiosCreated = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });

  axiosCreated.interceptors.response.use(null, function(error) {
    if ((error.response.status === 401 || error.response.status === 403) && location.pathname != "/") {
      location.href = "/";
    }
    return Promise.reject(error);
  });

  return axiosCreated;
};

export default api;
