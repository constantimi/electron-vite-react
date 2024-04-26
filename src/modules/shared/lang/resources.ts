import sharedEnTranslation from './en.json';
import sharedNlTranslation from './nl.json';
import loginEnTranslation from '../../login/lang/en.json';
import loginNlTranslation from '../../login/lang/nl.json';

const resources = {
  en: {
    shared: { ...sharedEnTranslation },
    login: { ...loginEnTranslation },
  },
  nl: {
    shared: { ...sharedNlTranslation },
    login: { ...loginNlTranslation },
  },
};

export default resources;
