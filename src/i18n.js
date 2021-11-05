import { createI18n } from "vue-i18n";
import messages from "@intlify/vite-plugin-vue-i18n/messages";

const datetimeFormats = {
  en: {
    dayShort: {
      weekday: "short",
    },
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
    },
  },
  nl: {
    dayShort: {
      weekday: "short",
    },
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    },
  },
};

export const i18n = createI18n({
  locale: "en",
  globalInjection: true,
  datetimeFormats,
  messages,
});
