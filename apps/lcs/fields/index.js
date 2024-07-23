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
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'tenant-dob': dateComponent('tenant-dob', {
    mixin: 'input-date',
    validate: [
      'required',
      'date',
      'over18',
      { type: 'after', arguments: ['120', 'years'] }
    ],
    legend: {
      className: 'govuk-label--s'
    }
  }),
  'tenant-nationality': {
    mixin: 'select',
    className: ['typeahead'],
    validate: [
      'required',
      excludeUK
    ],
    options: [{
      value: '',
      label: 'fields.tenant-nationality.options.null'
    }].concat(countries),
    labelClassName: 'govuk-label--s'
  },
  'ho-ref-number': {
    mixin: 'input-text',
    validate: ['required'],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'privacy-check': {
    mixin: 'checkbox',
    validate: ['required']
  },
  'before-or-after-1988': {
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
    validate: [
      'required',
      'date'
    ],
    className: ['govuk-label--s']
  }),
  'extra-tenant-pob': {
    mixin: 'input-text',
    validate: 'required',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'extra-tenant-ni-num': {
    mixin: 'input-text',
    validate: ['required', niNumber],
    className: ['govuk-input', 'govuk-input govuk-!-width-one-half']
  },
  'extra-tenant-email': {
    mixin: 'input-text',
    validate: 'email',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'extra-tenant-tel': {
    mixin: 'input-text',
    validate: ['required', 'notUrl', 'ukphonenumber'],
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  }
};
