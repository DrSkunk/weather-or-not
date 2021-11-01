import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import { i18n } from "./i18n";
import "./index.css";

const app = createApp(App);
app.use(i18n);
app.use(store);
app.mount("#app");
