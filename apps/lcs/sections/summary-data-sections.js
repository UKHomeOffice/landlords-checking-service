
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
    steps: [
      {
        step: '/extra-tenant-details',
        field: 'extra-tenant-tel'
      },
      {
        step: '/extra-tenant-details',
        field: 'extra-tenant-pob'
      },
      {
        step: '/extra-tenant-details',
        field: 'date-tenant-moved-uk',
        parse: d => d && moment(d).format(PRETTY_DATE_FORMAT)
      },
      {
        step: '/extra-tenant-details',
        field: 'extra-tenant-email'
      },
      {
        step: '/extra-tenant-details',
        field: 'extra-tenant-ni-num'
      }
    ]
  },
  'landlord-agent-information': {
    steps: []
  }
};
