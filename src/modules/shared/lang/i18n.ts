import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import sprintf from 'i18next-sprintf-postprocessor';
import { initReactI18next } from 'react-i18next';
import { en, enMetadata } from './locales/en';
import { nl } from './locales/nl';

const resources = {
  en,
  nl,
};

i18n
  .use(initReactI18next)
  .use(Backend)
  .use(sprintf)
  .init({
    resources,
    lng: enMetadata.code,
    fallbackLng: enMetadata.code,
    interpolation: {
      escapeValue: false,
    },
    debug: false,
  });
