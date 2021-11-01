import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import messages from "@intlify/vite-plugin-vue-i18n/messages";
import App from "./App.vue";
import "./index.css";

const app = createApp(App);
const i18n = createI18n({
  locale: "en",
  globalInjection: true,
  messages,
});
app.use(i18n).mount("#app");
