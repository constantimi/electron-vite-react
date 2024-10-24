import sharedEnTranslation from '../lang/en.json';
import sharedNlTranslation from '../lang/nl.json';

const resources = {
  en: {
    shared: { ...sharedEnTranslation },
  },
  nl: {
    shared: { ...sharedNlTranslation },
  },
};

export default resources;
