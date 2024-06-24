const hof = require('hof');
const summary = hof.components.summary;
const config = require('../../config');
const clearSession = require('./behaviours/clear-session');
const sendNotification = require('./behaviours/submit-notify');
const dateBefore1988 = config.dateBefore1988;

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
      fields: ['tenant-full-name', 'tenant-dob', 'tenant-nationality', 'ho-ref-number'],
      next: '/tenant-address'
    },
    '/tenant-address': {
      fields: [],
      next: '/before-1988',
      forks: [
        {
          target: '/before-1988',
          condition: req => req.sessionModel.get('tenant-dob') < dateBefore1988
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
