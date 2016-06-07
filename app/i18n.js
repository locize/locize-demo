import i18n from 'locize';


i18n
  .init({
    fallbackLng: 'en',

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: true,

    interpolation: {
      escapeValue: false // not needed for react!!
    }
  });


export default i18n;
