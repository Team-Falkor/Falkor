import i18next from "i18next";
import { initReactI18next } from "react-i18next";

//Import all translation files
import English from "./translations/english.json";
import French from "./translations/french.json";
import German from "./translations/german.json";
import Spanish from "./translations/spanish.json";

const resources = {
  en: {
    translation: English,
  },
  es: {
    translation: Spanish,
  },
  fr: {
    translation: French,
  },
  de: {
    translation: German,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "fr", //default language
});

export default i18next;
