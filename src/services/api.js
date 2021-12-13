import axios from "axios";

const api = () => {
  let token = localStorage.getItem("token");

  const axiosCreated = axios.create({
    baseURL: "https://api.imedyapp.com.br",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });

  axiosCreated.interceptors.response.use(null, function(error) {
    console.log(error);
    if (error.response.status === 401) {
      location.href = "/login";
    }
    return Promise.reject(error);
  });

  return axiosCreated;
};

export default api;
