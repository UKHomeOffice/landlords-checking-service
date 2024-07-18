const hof = require('hof');
const summary = hof.components.summary;
const config = require('../../config');
const clearSession = require('./behaviours/clear-session');
const sendNotification = require('./behaviours/submit-notify');
const dateBefore1989 = config.dateBefore1989;
const savedDetails = require('./behaviours/saving-details');

module.exports = {
  name: 'lcs',
  baseUrl: '/',
  confirmStep: '/confirm',
  steps: {
    '/start': {
      next: '/property-occupied'
    },
    '/property-occupied': {
      behaviours: [savedDetails],
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
      fields: [],
      next: '/extra-tenant-details'
    },
    '/extra-tenant-details': {
      fields: [],
      next: '/landlord-information'
    },
    '/landlord-information': {
      fields: [],
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
