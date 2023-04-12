import { createI18n } from "vue-i18n";
import en from "./lang/en";
import es from "./lang/es";
import pr from "./lang/pr";

const messages = {
    en,
    es,
    pr,
}

const i18n = createI18n({
    legacy: false,
    locale: import.meta.env.VITE_VUE_APP_LOCALE.toLowerCase(),
    globalInjection: true,
    messages,
})

export default i18n;