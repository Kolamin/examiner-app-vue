<template>
  <div>
    <Question
      v-for="question in questions"
      :question="question"
      :key="question.id"
    />
    <Paginate :total-pages="totalPages" :page="page" />
  </div>
</template>

<script>
import Question from "../components/Question";
import QuestionService from "../services/QuestionService";
import { watchEffect } from "vue";
import Paginate from "@/components/Paginate";

export default {
  name: "Questions",
  props: ["page"],
  components: {
    Paginate,
    Question,
  },
  data() {
    return {
      questions: [],
      totalQuestions: 0,
      limit: 10,
      totalPages: 0,
    };
  },
  created() {
    this.questions = null;
    watchEffect(() => {
      QuestionService.getQuestions(this.limit, this.page)
        .then((response) => {
          this.questions = response.data;
          this.totalQuestions = response.headers["x-total-count"];
          this.totalPages = Math.ceil(this.totalQuestions / this.limit);
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    });
  },
};
</script>

<style scoped>
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
</style>
