<template>
  <div v-if="user">
    <div class="select">
      <label for="sect">Выберите раздел:</label>
      <select id="sect" v-model="section">
        <option value="questions">А.1. Основы промышленной безопасности</option>
        <option value="hquestions">
          ЭБ 172.15. Эксплуатация тепловых энергоустановок и тепловых сетей
        </option>
      </select>
      <label for="count_page">Показывать вопросов:</label>
      <select id="count_page" v-model="perPage">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>
    <div v-if="section !== undefined">
      <Question
        v-for="question in questions"
        :question="question"
        :key="question.id"
      />
    </div>
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
      baseURL: "https://json-server-iquestions.herokuapp.com/",
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
        const response = await instance.get(section.value, {
          params: {
            _limit: perPage.value,
            _page: page.value,
          },
        });
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

    watch([section, page, perPage], (newValue, prevValue) => {
      console.log(newValue, prevValue);
      fetchQuestions();
    });

    return {
      user: computed(() => store.state.user),
      questions,
      section,
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
.select {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-basis: auto;
}
</style>
