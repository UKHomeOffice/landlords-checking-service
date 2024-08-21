
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
        parse: (value, req) => {
          if (!req.sessionModel.get('steps').includes('/property-occupied')) {
            return null;
          }
          if(req.sessionModel.get('person-live-in') === 'no') {
            return 'Not Applicable';
          }
          return value && moment(value).format(PRETTY_DATE_FORMAT);
        }
      },
      {
        step: '/tenant-details',
        field: 'ho-ref-number'
      },
      {
        step: '/tenant-details',
        field: 'tenant-full-name'
      },
      {
        step: '/tenant-details',
        field: 'tenant-dob',
        parse: d => d && moment(d).format(PRETTY_DATE_FORMAT)
      },
      {
        step: '/tenant-details',
        field: 'tenant-nationality'
      },
      {
        step: '/tenant-address',
        field: 'tenant-address-line-1'
      },
      {
        step: '/tenant-address',
        field: 'tenant-address-line-2'
      },
      {
        step: '/tenant-address',
        field: 'tenant-town-or-city'
      },
      {
        step: '/tenant-address',
        field: 'tenant-county'
      },
      {
        step: '/tenant-address',
        field: 'tenant-postcode'
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
    steps: [
      {
        step: '/landlord-information',
        field: 'landlord-or-agent-name'
      },
      {
        step: '/landlord-information',
        field: 'landlord-or-agent-company'
      },
      {
        step: '/landlord-information',
        field: 'landlord-or-agent-email'
      },
      {
        step: '/landlord-information',
        field: 'landlord-or-agent-tel'
      },
      {
        step: 'tenant-address',
        field: 'tenant-address-details',
        parse: (list, req) => {
          if (!req.sessionModel.get('steps').includes('/tenant-address')) {
            return null;
          }

          const addressDetails = [];

          addressDetails.push(req.sessionModel.get('tenant-address-line-1') || '');
          if(req.sessionModel.get('tenant-address-line-2')) {
            addressDetails.push(req.sessionModel.get('tenant-address-line-2'));
          }
          addressDetails.push(req.sessionModel.get('tenant-town-or-city') || '');
          if(req.sessionModel.get('tenant-county')) {
            addressDetails.push(req.sessionModel.get('tenant-county'));
          }
          addressDetails.push(req.sessionModel.get('tenant-postcode') || '');
          req.sessionModel.set('tenantAddressDetails', addressDetails.filter(line => line).join(', '));
          return addressDetails.join('\n');
        }
      },
      {
        step: '/tenant-address',
        field: '/tenant-address'
      }
    ]
  }
};
