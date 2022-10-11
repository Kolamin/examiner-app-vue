import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

// global styles
import "./assets/main.css";

createApp(App).use(store).use(router).mount("#app");
