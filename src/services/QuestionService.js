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
  getQuestions() {
    return apiClient.get("/questions");
  },
  getQuestion(id) {
    return apiClient.get("/questions/" + id);
  },
};
