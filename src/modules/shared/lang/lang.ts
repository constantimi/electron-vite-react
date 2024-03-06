import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import sprintf from 'i18next-sprintf-postprocessor';
import Backend from 'i18next-http-backend';
import { LANGUAGECODES, NAMESPACES } from '../constants/lang';
import LocalSettings from '../store/app/settings/local/local';
import resources from './resources';

export const initTranslation = async () => {
  let lng = LocalSettings.get('defaultLang');
  if (!LANGUAGECODES.includes(lng)) {
    // eslint-disable-next-line no-console
    console.error(`Language ${lng} not supported, auto default to english`);
    lng = 'en';
  }

  i18n
    .use(initReactI18next)
    .use(Backend)
    .use(sprintf)
    .init({
      lng,
      debug: false,
      fallbackLng: 'en', // https://www.i18next.com/principles/fallback
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
