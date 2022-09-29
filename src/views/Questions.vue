<template>
  <div>
    <Question
      v-for="question in questions"
      :question="question"
      :key="question.id"
    />
    <!--    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'Questions', query: { page: page - 1 } }"
        rel="prev"
        v-if="page !== 1"
        >&#60; Предыдущий
      </router-link>

      <router-link
        id="page-next"
        :to="{ name: 'Questions', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Следующий &#62;
      </router-link>
    </div>-->
    <div class="page__wrapper">
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{ 'current-page': page === pageNumber }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
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
  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalQuestions / this.limit);
      return this.page < totalPages;
    },
  },
  methods: {
    changePage(pageNumber) {
      this.$router.push({ name: "Questions", query: { page: pageNumber } });
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

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
  margin-right: 8px;
  cursor: pointer;
}

.current-page {
  border: 4px solid teal;
}
</style>
