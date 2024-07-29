const hof = require('hof');
const summary = hof.components.summary;
const config = require('../../config');
const clearSession = require('./behaviours/clear-session');
const sendNotification = require('./behaviours/submit-notify');
const saveDetails = require('./behaviours/saving-details');
const dateBefore1989 = config.dateBefore1989;
const checkValidation = require('./behaviours/date-validation.js');

module.exports = {
  name: 'lcs',
  baseUrl: '/',
  confirmStep: '/confirm',
  steps: {
    '/start': {
      next: '/property-occupied'
    },
    '/property-occupied': {
      fields: ['person-live-in', 'when-person-moved-in'],
      next: '/tenant-details'
    },
    '/tenant-details': {
      behaviours: [hof.components.homeOfficeCountries],
      fields: ['tenant-full-name', 'tenant-dob', 'tenant-nationality', 'ho-ref-number'],
      next: '/tenant-address'
    },
    '/tenant-address': {
      fields: ['tenant-address-line-1', 'tenant-address-line-2',
        'tenant-town-or-city', 'tenant-county', 'tenant-postcode'],
      next: '/landlord-information',
      forks: [
        {
          target: '/before-1988',
          condition: req => req.sessionModel.get('tenant-dob') <= dateBefore1989
        }
      ]
    },
    '/before-1988': {
      fields: ['before-or-after-1988'],
      next: '/extra-tenant-details',
      forks: [
        {
          target: '/landlord-information',
          condition: {
            field: 'before-or-after-1988',
            value: 'no'
          }
        }
      ]
    },
    '/extra-tenant-details': {
      behaviours: [checkValidation],
      fields: ['date-tenant-moved-uk',
        'extra-tenant-pob',
        'extra-tenant-ni-num',
        'extra-tenant-email',
        'extra-tenant-tel'],
      next: '/landlord-information'
    },
    '/landlord-information': {
      behaviours: [saveDetails],
      fields: ['landlord-or-agent-name', 'landlord-or-agent-company',
        'landlord-or-agent-email', 'landlord-or-agent-tel', 'landlord-or-agent-postcode'],
      next: '/rental-property'
    },
    '/rental-property': {
      fields: [],
      next: '/confirm'
    },
    '/confirm': {
      behaviours: [summary],
      sections: require('./sections/summary-data-sections'),
      template: 'summary',
      next: '/privacy-policy'
    },
    '/privacy-policy': {
      behaviours: [sendNotification],
      fields: ['privacy-check'],
      next: '/check-requested'
    },
    '/check-requested': {
      behaviours: [clearSession],
      next: ''
    }
  }
};
