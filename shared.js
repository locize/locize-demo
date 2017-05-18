// get param
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// location change
function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}

function changeLanguage(lng) {
  window.location = updateQueryStringParameter(window.location.href, 'lng', lng);
}

// location change
var ele = document.getElementById('languageSelect');
var availableLngs = [];
// create select options based on project languages
locizify.getLanguages(function(err, lngs) {
  availableLngs = Object.keys(lngs || {});
  availableLngs.forEach(function(l) {
    var lng = lngs[l];
    // turn this on to avoid showing untranslated languages
    // if (lng.translated.latest < 0.9) return;
    var optEle = document.createElement("OPTION");
    optEle.setAttribute('value', l);
    optEle.innerHTML = lng.nativeName;
    ele.appendChild(optEle);
  });
  updateSelect();
});
function updateSelect() {
  var selected;
  locizify.i18next.languages.forEach(function(l) {
    if (!selected && availableLngs.indexOf(l) > -1) selected = l;
  });
  ele.value = selected || 'en';
}
locizify.i18next.on('languageChanged', function(lng) {
  updateSelect();
});
function handleSelectChange() {
  var value = ele.options[ele.selectedIndex].value;
  changeLanguage(value);
}

window.locizeUtils = {
  getParameterByName: getParameterByName,
  updateQueryStringParameter: updateQueryStringParameter,
  changeLanguage: changeLanguage
};
