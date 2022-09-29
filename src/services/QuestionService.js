import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://json-server-iquestions.herokuapp.com/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getQuestions(perPage, page) {
    return apiClient.get("/questions?_limit=" + perPage + "&_page=" + page);
  },
  getQuestion(id) {
    return apiClient.get("/questions/" + id);
  },
};
