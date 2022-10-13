<template>
  <div v-if="user">
    <router-link to="/iquestions"
      >А.1. Основы промышленной безопасности</router-link
    >
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
