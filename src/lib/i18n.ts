import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    lng: 'en', // Default language, can be detected or set based on user preference/route
    fallbackLng: 'en',
    ns: ['common'], // Namespace(s) to load
    defaultNS: 'common',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Path to your translation files
    },
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
    // debug: process.env.NODE_ENV === 'development',
  });

export default i18n;

