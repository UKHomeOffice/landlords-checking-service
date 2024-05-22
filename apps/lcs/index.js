const hof = require('hof');
const summary = hof.components.summary;
const clearSession = require('./behaviours/clear-session');
const sendNotification = require('./behaviours/submit-notify');

/**
 * Checks if a given field value matches a conditional value based on the request object.
 *
 * @param {Object} req - The request object.
 * @param {string} fieldName - The name of the field to check.
 * @param {string} conditionalValue - The value to compare against the field value.
 * @returns {boolean} - Returns true if the field value matches the conditional value, false otherwise.
 */
function forkCondition(req, fieldName, conditionalValue) {
  const fieldValue = req.sessionModel.get(fieldName);
  if (!fieldValue) return false;
  return Array.isArray(fieldValue) ? fieldValue.includes(conditionalValue) : fieldValue === conditionalValue;
}

module.exports = {
  name: 'lcs',
  baseUrl: '/',
  confirmStep: '/confirm',
  steps: {
    '/start': {
      next: '/property-occupied'
    },
    '/property-occupied': {
      fields: [],
      next: '/tenant-details'
    },
    '/tenant-details': {
      fields: [],
      next: '/tenant-address'
    },
    '/tenant-address': {
      fields: [],
      next: '/before-1988'
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
