<template>
  <div v-if="user">
    <router-link to="/iquestions"
      >А.1. Основы промышленной безопасности</router-link
    >
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
import { computed } from "vue";
export default {
  setup() {
    const store = useStore();

    return {
      user: computed(() => store.state.user),
    };
  },
};
</script>

<style scoped></style>
