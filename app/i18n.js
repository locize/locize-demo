import i18n from 'locize';

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var backend = {
  referenceLng: 'en',
  apiKey: getParameterByName('api_key'),
  projectId: getParameterByName('project_id')
}
if (getParameterByName('dev')) {
  backend.loadPath = 'https://api-dev.locize.io/{{projectId}}/latest/{{lng}}/{{ns}}';
  backend.addPath = 'https://api-dev.locize.io/missing/{{projectId}}/latest/{{lng}}/{{ns}}';
}

i18n
  .init({
    fallbackLng: 'en',

    // have a common namespace used around the full app
    ns: ['app'],
    defaultNS: 'app',

    debug: false,
    saveMissing: false,

    interpolation: {
      escapeValue: false // not needed for react!!
    },

    backend: backend
  });


export default i18n;
