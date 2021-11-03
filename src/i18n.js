import { createI18n } from "vue-i18n";
import messages from "@intlify/vite-plugin-vue-i18n/messages";

const datetimeFormats = {
  "en-US": {
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
  "nl-BE": {
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
  locale: "en-US",
  globalInjection: true,
  datetimeFormats,
  messages,
});
