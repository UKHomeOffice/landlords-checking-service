'use strict';

require('hof/frontend/themes/gov-uk/client-js');

const accessibleAutocomplete = require('accessible-autocomplete');

document.querySelectorAll('.typeahead').forEach(function applyTypeahead(element) {
  accessibleAutocomplete.enhanceSelectElement({
    defaultValue: '',
    selectElement: element
  });
});
