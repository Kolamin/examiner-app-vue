<template>
  <div>
    <router-link to="/iquestions"
      >А.1. Основы промышленной безопасности</router-link
    >
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    console.log(store.state.user);
  },
};
</script>

<style scoped></style>
