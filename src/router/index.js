import { createRouter, createWebHistory } from "vue-router";
import Questions from "@/views/Questions";

const routes = [
  {
    path: "/",
    name: "Questions",
    component: Questions,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
