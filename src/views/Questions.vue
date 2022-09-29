<template>
  <div>
    <Question
      v-for="question in questions"
      :question="question"
      :key="question.id"
    />
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'Questions', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Предыдущий
      </router-link>

      <router-link
        id="page-next"
        :to="{ name: 'Questions', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Следующий &#62;
      </router-link>
    </div>
  </div>
</template>

<script>
import Question from "../components/Question";
import QuestionService from "../services/QuestionService";
import { watchEffect } from "vue";

export default {
  name: "Questions",
  props: ["page"],
  components: {
    Question,
  },
  data() {
    return {
      questions: [],
      totalQuestions: 0,
    };
  },
  created() {
    this.questions = null;
    watchEffect(() => {
      QuestionService.getQuestions(10, this.page)
        .then((response) => {
          this.questions = response.data;
          this.totalQuestions = response.headers["x-total-count"];
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    });
  },
  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalQuestions / 2);
      return this.page < totalPages;
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: left;
}

#page-next {
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: right;
}
</style>
