<template>
  <div v-if="user">
    <div>
      <label for="sec">Выберите раздел</label>
      <select id="sec" v-model="section" @change="onChange">
        <option value="questions">А.1. Основы промышленной безопасности</option>
        <option value="hquestions">
          ЭБ 172.15 Эксплуатация тепловых энергоустановок и тепловых сетей
        </option>
      </select>
    </div>
    <div>
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
import { computed, ref } from "vue";
import axios from "axios";
import Question from "@/components/Question";

export default {
  components: {
    Question,
  },
  setup() {
    const store = useStore();
    const section = ref("");
    const questions = ref([]);
    const page = ref(1);
    const limit = ref(3);
    const totalPages = ref(0);

    function onChange() {
      console.log(section.value);
      fetchQuestions();
    }

    function changePage(pageNumber) {
      page.value = pageNumber.value;
    }

    async function fetchQuestions() {
      try {
        const result = await axios.get(
          "https://json-server-iquestions.herokuapp.com/" + section.value + "/",
          {
            params: {
              _page: page.value,
              _limit: limit.value,
            },
          }
        );
        totalPages.value = Math.ceil(
          result.headers["x-total-count"] / limit.value
        );
        questions.value = result.data;
      } catch (err) {
        alert("Ошибка");
      }
    }

    return {
      user: computed(() => store.state.user),
      questions,
      section,
      onChange,
      totalPages,
      page,
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
