<template>
  <Question
    v-for="question in questions"
    :question="question"
    :key="question"
  />
</template>

<script>
import Question from "../components/Question";
import QuestionService from "../services/QuestionService";

export default {
  name: "Questions",
  components: {
    Question,
  },
  data() {
    return {
      questions: [],
    };
  },
  created() {
    QuestionService.getQuestions()
      .then((response) => {
        this.questions = response.data;
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },
};
</script>

<style scoped></style>
