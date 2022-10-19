import { createRouter, createWebHistory } from "vue-router";
import Questions from "@/views/Questions";
import Home from "@/views/Home";
import Signup from "@/views/Signup";
import Login from "@/views/Login";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/questions",
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
