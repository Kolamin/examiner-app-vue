<template>
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
</template>

<script>
export default {
  name: "Paginate",
  props: ["totalPages", "page"],
  methods: {
    changePage(pageNumber) {
      this.$router.push({ name: "Questions", query: { page: pageNumber } });
    },
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
