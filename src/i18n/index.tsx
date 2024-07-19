import i18next from "i18next";
import { initReactI18next } from "react-i18next";

//Import all translation files
import English from "./translations/english.json";

const resources = {
  en: {
    translation: English,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "en", //default language
});

export default i18next;
