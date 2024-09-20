const config = require('../../../config');
const NotifyClient = require('notifications-node-client').NotifyClient;
const notifyKey = config.govukNotify.notifyApiKey;
const notifyClient = new NotifyClient(notifyKey);
const moment = require('moment');
const { getLabel } = require('../../../utils');

module.exports = class SendEmailConfirmation {
  constructor(req) {
    this.req = req;
    this.businessEmailPersonalisation = this.getPersonalisation('business', req);
    this.userEmailPersonalisation = this.getPersonalisation('user', req);
  }

  getPersonalisation(recipientType, req) {
    const basePersonalisation = {
      is_tenant: req.sessionModel.get('isCurrentTenant') ? 'yes' : 'no',
      is_prospective_tenant: !req.sessionModel.get('isCurrentTenant') ? 'yes' : 'no',
      existing_occupier: getLabel('person-live-in', req.sessionModel.get('person-live-in')),
      is_existing_occupier: req.sessionModel.get('person-live-in'),
      person_moved_into_property: req.sessionModel.get('when-person-moved-in') ?
        moment(req.sessionModel.get('when-person-moved-in')).format(config.PRETTY_DATE_FORMAT) : '',
      ho_ref_number: req.sessionModel.get('ho-ref-number'),
      full_name: req.sessionModel.get('tenant-full-name'),
      date_of_birth: moment(req.sessionModel.get('tenant-dob')).format(config.PRETTY_DATE_FORMAT),
      country_of_nationality: req.sessionModel.get('tenant-nationality'),
      full_address: req.sessionModel.get('tenantAddress').join(', '),
      is_before_1988: req.sessionModel.get('steps').includes('/before-1988') ?
        req.sessionModel.get('in-uk-before-1988') : 'no',
      date_of_entry: req.sessionModel.get('date-tenant-moved-uk') ?
        moment(req.sessionModel.get('date-tenant-moved-uk')).format(config.PRETTY_DATE_FORMAT) : '',
      place_of_birth: req.sessionModel.get('extra-tenant-pob') ?? '',
      national_insurance_number: req.sessionModel.get('extra-tenant-ni-num') ?? '',
      tenant_email: req.sessionModel.get('extra-tenant-email') ?? '',
      tenant_tel: req.sessionModel.get('extra-tenant-tel') ?? '',
      landlord_name: req.sessionModel.get('landlord-or-agent-name'),
      landlord_email: req.sessionModel.get('landlord-or-agent-email'),
      prospective_rental_postcode: !req.sessionModel.get('isCurrentTenant') ?
        req.sessionModel.get('rental-property-postcode') : '',
      rental_property_address: req.sessionModel.get('isCurrentTenant') ?
        req.sessionModel.get('tenantAddress').join(', ') : '',
      tenant_address_line_1: req.sessionModel.get('tenant-address-line-1'),
      tenant_address_line_2: req.sessionModel.get('tenant-address-line-2') ?? '',
      tenant_town_or_city: req.sessionModel.get('tenant-town-or-city'),
      tenant_county: req.sessionModel.get('tenant-county') ?? '',
      tenant_postcode: req.sessionModel.get('tenant-postcode'),
      rental_address_line_1: req.sessionModel.get('isCurrentTenant') ?
        req.sessionModel.get('tenant-address-line-1') : '',
      rental_address_line_2: req.sessionModel.get('isCurrentTenant') ?
        req.sessionModel.get('tenant-address-line-2') : '',
      rental_town_or_city: req.sessionModel.get('isCurrentTenant') ?
        req.sessionModel.get('tenant-town-or-city') : '',
      rental_county: req.sessionModel.get('isCurrentTenant') ?
        req.sessionModel.get('tenant-county') : '',
      rental_postcode: req.sessionModel.get('isCurrentTenant') ?
        req.sessionModel.get('tenant-postcode') : ''
    };

    const recipientPersonalisation = {};
    if(recipientType === 'user') {
      recipientPersonalisation.has_landlord_company = req.sessionModel.get('landlord-or-agent-company') ? 'yes' : 'no';
      recipientPersonalisation.landlord_company = req.sessionModel.get('landlord-or-agent-company') ?? '';
      recipientPersonalisation.has_landlord_tel = req.sessionModel.get('landlord-or-agent-tel') ? 'yes' : 'no';
      recipientPersonalisation.landlord_tel =  req.sessionModel.get('landlord-or-agent-tel') ?? '';
    }
    if(recipientType === 'business')  {
      recipientPersonalisation.landlord_company = req.sessionModel.get('landlord-or-agent-company') || 'Not Provided';
      recipientPersonalisation.landlord_tel =  req.sessionModel.get('landlord-or-agent-tel') || 'Not Provided';
    }

    return Object.assign(basePersonalisation, recipientPersonalisation);
  }

  async send(recipientType) {
    try {
      const targetTemplate = `${recipientType}ConfirmationTemplateId`;
      const targetEmailAddress = recipientType === 'user' ?
        this.req.sessionModel.get('landlord-or-agent-email') : config.govukNotify.caseworkerEmail;
      const emailReplyToId = config.govukNotify.replyToEmailID;
      await notifyClient.sendEmail(
        config.govukNotify[targetTemplate],
        targetEmailAddress,
        {
          personalisation: recipientType === 'user' ? this.userEmailPersonalisation : this.businessEmailPersonalisation,
          emailReplyToId: emailReplyToId
        }
      );

      this.req.log(
        'info',
        `${recipientType} confirmation email sent successfully`
      );
    } catch (err) {
      const errorDetails = err.response?.data ? `Cause: ${JSON.stringify(err.response.data)}` : '';
      const errorCode = err.code ? `${err.code} -` : '';
      const errorMessage = `${errorCode} ${err.message}; ${errorDetails}`;

      this.req.log(
        'error',
        `Failed to send ${recipientType} confirmation email`,
        errorMessage
      );
      throw Error(errorMessage);
    }
  }
};
