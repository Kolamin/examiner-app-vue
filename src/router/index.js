import { createRouter, createWebHistory } from "vue-router";
import Questions from "../views/Questions";

const routes = [
  {
    path: "/questions",
    name: "questions",
    component: Questions,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
