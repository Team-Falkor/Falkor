import i18next from "i18next";
import { initReactI18next } from "react-i18next";

//Import all translation files
import ChineseSimplified from "./translations/chinese-simplified.json";
import English from "./translations/english.json";
import French from "./translations/french.json";
import German from "./translations/german.json";
import Indonesian from "./translations/indonesian.json";
import japanese from "./translations/japanese.json";
import Korean from "./translations/korean.json";
import Malay from "./translations/malay.json";
import Portuguese from "./translations/portuguese.json";
import Spanish from "./translations/spanish.json";
import Thai from "./translations/thai.json";
import Vietnamese from "./translations/vietnamese.json";

const resources = {
  en: { translation: English },
  es: { translation: Spanish },
  fr: { translation: French },
  de: { translation: German },
  "zh-cn": { translation: ChineseSimplified },
  ja: { translation: japanese },
  ko: { translation: Korean },
  vi: { translation: Vietnamese },
  th: { translation: Thai },
  id: { translation: Indonesian },
  ms: { translation: Malay },
  pt: { translation: Portuguese },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "en", //default language
});

export default i18next;
