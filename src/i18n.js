import { createI18n } from "vue-i18n";
import messages from "@intlify/vite-plugin-vue-i18n/messages";

const datetimeFormats = {
  en: {
    time: {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    },
    dayShort: {
      weekday: "short",
      month: "short",
      day: "numeric",
    },
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    long: {
      weekday: "long",
      month: "long",
      day: "numeric",
    },
  },
  nl: {
    time: {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    },
    dayShort: {
      weekday: "short",
      month: "short",
      day: "numeric",
    },
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    long: {
      weekday: "long",
      month: "long",
      day: "numeric",
    },
  },
};

export const languages = {
  en: "English",
  nl: "Nederlands",
};

export const i18n = createI18n({
  locale: "en",
  globalInjection: true,
  datetimeFormats,
  messages,
});
