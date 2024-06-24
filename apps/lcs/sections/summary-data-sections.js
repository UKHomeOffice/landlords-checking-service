
'use strict';

const moment = require('moment');
const PRETTY_DATE_FORMAT = 'DD MMMM YYYY';

module.exports = {
  'tenants-information': {
    steps: [
      {
        step: '/property-occupied',
        field: 'person-live-in'
      },
      {
        step: '/property-occupied',
        field: 'when-person-moved-in',
        parse: d => d && moment(d).format(PRETTY_DATE_FORMAT)
      }
    ]
  },
  'tenants-contact-details': {
    steps: []
  },
  'landlord-agent-information': {
    steps: []
  }
};
