const dateComponent = require('hof').components.date;
const countries = require('hof').utils.countries();


/**
 * Validation rule to exclude the value 'United Kingdom'.
 * @param {string} value - The value to be checked.
 * @returns {boolean} - Returns true if the value is not 'United Kingdom', otherwise false.
 */
function excludeUK(value) {
  return value !== 'United Kingdom';
}

function niNumber(value) {
  const NiN = value.toUpperCase();
  // eslint-disable-next-line max-len
  return NiN.match(/^(?!BG)(?!GB)(?!NK)(?!KN)(?!TN)(?!NT)(?!ZZ)(?:[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z])(?:\s*\d\s*){6}([A-D]|\s)$/);
}
module.exports = {
  'person-live-in': {
    isPageHeading: 'true',
    mixin: 'radio-group',
    validate: 'required',
    className: ['block', 'form-group'],
    options: [
      {
        value: 'yes',
        toggle: 'when-person-moved-in-toggle-content',
        child: 'partials/when-person-moved-in'
      },
      {
        value: 'no'
      }
    ]
  },
  'when-person-moved-in': dateComponent('when-person-moved-in', {
    mixin: 'input-date',
    validate: [
      'required',
      'date',
      { type: 'before', arguments: ['0', 'days'] },
      { type: 'after', arguments: ['2014-11-30'] }
    ],
    validationLink: {
      field: 'person-live-in',
      value: 'yes'
    },
    legend: {
      className: 'govuk-label--s'
    }
  }),
  'tenant-full-name': {
    mixin: 'input-text',
    validate: ['required', 'notUrl'],
    labelClassName: '',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'tenant-dob': dateComponent('tenant-dob', {
    mixin: 'input-date',
    validate: [
      'over18',
      { type: 'after', arguments: ['120', 'years'] }
    ], // additional validation rules added in custom-validation.js
    legend: {
      className: ''
    }
  }),
  'tenant-nationality': {
    mixin: 'select',
    className: ['typeahead', 'govuk-input govuk-!-width-three-quarters'],
    validate: [
      'required',
      excludeUK
    ],
    options: [{
      value: '',
      label: 'fields.tenant-nationality.options.none_selected'
    }].concat(countries.filter(country => country.value !== 'United Kingdom')),
    labelClassName: ''
  },
  'ho-ref-number': {
    mixin: 'input-text',
    validate: ['required', 'notUrl'],
    labelClassName: '',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'privacy-check': {
    mixin: 'checkbox',
    validate: ['required']
  },
  'in-uk-before-1988': {
    isPageHeading: 'true',
    mixin: 'radio-group',
    validate: 'required',
    className: ['block', 'form-group', 'govuk-radios govuk-radios--inline'],
    options: [
      {
        value: 'yes'
      },
      {
        value: 'no'
      }
    ]
  },
  'date-tenant-moved-uk': dateComponent('date-tenant-moved-uk', {
    mixin: 'input-date',
    validate: [], // additional validation rules added in custom-validation.js
    className: ['govuk-label--s']
  }),
  'extra-tenant-pob': {
    mixin: 'input-text',
    validate: ['required', 'notUrl'],
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'extra-tenant-ni-num': {
    mixin: 'input-text',
    validate: ['required', niNumber],
    className: ['govuk-input', 'govuk-input govuk-!-width-one-half']
  },
  'extra-tenant-email': {
    mixin: 'input-text',
    validate: [{ type: 'minlength', arguments: 6 }, { type: 'maxlength', arguments: 254 }, 'email'],
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'extra-tenant-tel': {
    mixin: 'input-text',
    validate: ['required'], // additional validation rules added in custom-validation.js
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'tenant-address-line-1': {
    mixins: 'input-text',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 250 }],
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'tenant-address-line-2': {
    mixins: ['input-text'],
    validate: ['notUrl', { type: 'maxlength', arguments: 250 }],
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'tenant-town-or-city': {
    mixins: 'input-text',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 250 }],
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'tenant-county': {
    mixins: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: 250 }],
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'tenant-postcode': {
    mixins: 'input-text',
    formatter: ['ukPostcode'],
    validate: ['required', 'postcode'],
    className: ['govuk-input', 'govuk-input--width-10']
  },
  'landlord-or-agent-name': {
    mixins: 'input-text',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 250 }],
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'landlord-or-agent-company': {
    mixins: 'input-text',
    validate: [ 'notUrl', { type: 'maxlength', arguments: 250 }],
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'landlord-or-agent-email': {
    mixins: 'input-text',
    validate: ['required', { type: 'minlength', arguments: 6 }, { type: 'maxlength', arguments: 254 }, 'email'],
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'landlord-or-agent-tel': {
    mixins: 'input-text',
    validate: [], // additional validation rules added in custom-validation.js
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'rental-property-postcode': {
    mixins: 'input-text',
    formatter: ['ukPostcode'],
    validate: ['required', 'postcode'], // additional validation rules added in custom-validation.js
    dependent: {
      field: 'person-live-in',
      value: 'no'
    },
    className: ['govuk-input', 'govuk-input--width-10']
  }
};
