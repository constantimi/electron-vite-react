import sharedEnTranslation from './en.json';
import sharedNlTranslation from './nl.json';

const resources = {
  en: {
    shared: { ...sharedEnTranslation },
  },
  nl: {
    shared: { ...sharedNlTranslation },
  },
};

export default resources;
