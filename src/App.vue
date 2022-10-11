<template>
  <div class="container">
    <Navbar />
    <router-view />
  </div>
</template>

<style scoped>
.container {
  max-width: 960px;
  margin: 0 auto;
}
</style>
<script>
import Navbar from "@/components/Navbar";
export default {
  components: { Navbar },
};
</script>
