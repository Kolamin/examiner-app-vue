<template>
  <div v-if="user">
    <div>
      <label for="sect">Выберите раздел:</label>
      <select id="sect" v-model="section">
        <option value="questions">А.1. Основы промышленной безопасности</option>
        <option value="hquestions">
          ЭБ 172.15. Эксплуатация тепловых энергоустановок и тепловых сетей
        </option>
      </select>
    </div>
    <div v-if="section !== undefined">
      <Question
        v-for="question in questions"
        :question="question"
        :key="question.id"
      />
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
  </div>
  <div v-else>
    <h3>
      Добро пожаловать в приложение предэкзаменационной подготовки и проверки
      знаний в области промышленной безопасности.
    </h3>
    <h3>Создайте логин и пароль чтобы получить доступ к тестам.</h3>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import Question from "../components/Question";
import axios from "axios";
export default {
  components: {
    Question,
  },
  setup() {
    const store = useStore();
    const questions = ref([]);
    const section = ref(undefined);
    const page = ref(1);
    const perPage = ref(10);
    const totalPages = ref(0);
    const totalQuestions = ref(0);

    const instance = axios.create({
      baseURL: "https://json-server-iquestions.herokuapp.com",
      timeout: 40000,
      withCredentials: false,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    async function fetchQuestions() {
      try {
        questions.value = null;
        const response = await instance.get(
          "/" +
            section.value +
            "?_limit=" +
            perPage.value +
            "&_page=" +
            page.value
        );
        questions.value = response.data;
        totalQuestions.value = response.headers["x-total-count"];
        totalPages.value = Math.ceil(totalQuestions.value / perPage.value);
      } catch (e) {
        console.log(e);
      }
    }

    function changePage(pageNumber) {
      page.value = pageNumber;
    }

    watch([section, page], (newValue, prevValue) => {
      console.log(newValue, prevValue);
      fetchQuestions();
    });

    return {
      user: computed(() => store.state.user),
      questions,
      section,
      fetchQuestions,
      page,
      perPage,
      totalQuestions,
      totalPages,
      changePage,
    };
  },
};
</script>

<style scoped>
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
