import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import sprintf from 'i18next-sprintf-postprocessor';
import { initReactI18next } from 'react-i18next';
import { LANGUAGECODES, NAMESPACES } from '../constants/lang';
import resources from './resources';
import config from '../config/config';

export const initTranslation = async () => {
  let lng = config.settings.defaultLang;

  if (!LANGUAGECODES.includes(lng)) {
    // eslint-disable-next-line no-console
    console.warn(`Language ${lng} not supported, auto default to english`);
    lng = 'en';
  }

  i18n
    .use(initReactI18next)
    .use(Backend)
    .use(sprintf)
    .init({
      lng,
      debug: false,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      ns: NAMESPACES,
      defaultNS: 'shared',
      resources,
    });
};

export const setLanguage = async (lang: (typeof LANGUAGECODES)[number]) => {
  i18n.changeLanguage(lang);
};
