import i18n from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './i18n/en.json';
import pl from './i18n/pl.json';

const DEFAULT_LANGUAGE = 'en';
const resources = {
  en: {
    translation: en
  },
  pl: {
    translation: pl
  }
};

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    detection: {
      order: ['navigator']
    },
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: ['en', 'pl'],
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
