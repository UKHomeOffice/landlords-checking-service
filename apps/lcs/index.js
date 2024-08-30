const hof = require('hof');
const summary = hof.components.summary;
const config = require('../../config');
const clearSession = require('./behaviours/clear-session');
const sendNotification = require('./behaviours/submit-notify');
const saveDetails = require('./behaviours/saving-details');
const customValidation = require('./behaviours/custom-validation.js');
const customRedirect = require('./behaviours/custom-redirect');
const valuesEnricher = require('./behaviours/values-enricher')(config);
const localsEnricher  = require('./behaviours/locals-enricher');

const steps =  {
  '/start': {
    next: '/property-occupied'
  },
  '/property-occupied': {
    behaviours: [
      saveDetails('person-live-in'),
      valuesEnricher('person-live-in', 'tenantType'),
      valuesEnricher('when-person-moved-in', 'tenantMovedIn')
    ],
    fields: ['person-live-in', 'when-person-moved-in'],
    next: '/tenant-details'
  },
  '/tenant-details': {
    behaviours: [
      hof.components.homeOfficeCountries,
      customValidation,
      valuesEnricher('tenant-dob', 'tenantDoB')
    ],
    fields: [
      'tenant-full-name',
      'tenant-dob',
      'tenant-nationality',
      'ho-ref-number'
    ],
    next: '/tenant-address'
  },
  '/tenant-address': {
    behaviours: [customRedirect],
    fields: [
      'tenant-address-line-1',
      'tenant-address-line-2',
      'tenant-town-or-city',
      'tenant-county',
      'tenant-postcode'
    ],
    next: '/landlord-information',
    forks: [
      {
        target: '/before-1988',
        condition: req => req.sessionModel.get('tenant-dob') < config.startOf1988
      }
    ]
  },
  '/before-1988': {
    fields: ['in-uk-before-1988'],
    next: '/extra-tenant-details',
    forks: [
      {
        target: '/landlord-information',
        condition: {
          field: 'in-uk-before-1988',
          value: 'no'
        }
      }
    ]
  },
  '/extra-tenant-details': {
    behaviours: [customValidation],
    fields: ['date-tenant-moved-uk',
      'extra-tenant-pob',
      'extra-tenant-ni-num',
      'extra-tenant-email',
      'extra-tenant-tel'
    ],
    next: '/landlord-information'
  },
  '/landlord-information': {
    behaviours: [customValidation],
    fields: [
      'landlord-or-agent-name',
      'landlord-or-agent-company',
      'landlord-or-agent-email',
      'landlord-or-agent-tel',
      'rental-property-postcode'
    ],
    next: '/confirm',
    forks: [
      {
        target: '/rental-property',
        condition: {
          field: 'person-live-in',
          value: 'yes'
        }
      }
    ]
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
};

Object.keys(steps).map(key => {
  steps[key].behaviours = steps[key].behaviours || [];
  steps[key].behaviours.unshift(localsEnricher);
});

module.exports = {
  name: 'lcs',
  baseUrl: '/',
  confirmStep: '/confirm',
  steps: steps
};
