const config = require('../../../config');
const NotifyClient = require('notifications-node-client').NotifyClient;
const notifyKey = config.govukNotify.notifyApiKey;
const translation = require('../translations/src/en/fields.json');
const notifyClient = new NotifyClient(notifyKey);
const moment = require('moment');

const getLabel = (fieldKey, fieldValue) => {
  if (Array.isArray(fieldValue)) {
    return fieldValue.map(option => translation[fieldKey].options[option].label).join(', ');
  }
  return translation[fieldKey].options[fieldValue].label;
};


const getPersonalisation = (recipientType, req) => {
  const basePersonalisation = {
    existing_occupier: getLabel('person-live-in', req.sessionModel.get('person-live-in')),
    person_moved_into_property: req.sessionModel.get('when-person-moved-in'),
    ho_ref_number: req.sessionModel.get('ho-ref-number'),
    full_name: req.sessionModel.get('tenant-full-name'),
    date_of_birth: req.sessionModel.get('tenant-dob'),
    country_of_nationality: req.sessionModel.get('tenant-nationality'),
    full_address: 'Full address',
    date_of_entry: req.sessionModel.get('date-tenant-moved-uk'),
    place_of_birth: req.sessionModel.get('extra-tenant-pob'),
    national_insurance_number: req.sessionModel.get('extra-tenant-ni-num'),
    tenant_email: req.sessionModel.get('extra-tenant-email'),
    tenant_tel: req.sessionModel.get('extra-tenant-tel'),
    landlord_name: req.sessionModel.get('landlord-or-agent-name'),
    landlord_company: req.sessionModel.get('landlord-or-agent-company'),
    landlord_email: req.sessionModel.get('landlord-or-agent-email'),
    landlord_tel: req.sessionModel.get('landlord-or-agent-tel'),
    full_rental_address: 'Full rental address'
  };
  return {
    ...basePersonalisation
  };
};

module.exports = class SendEmailConfirmation {
  async sendUserEmailNotification(req) {
    const personalisations = getPersonalisation('user', req);

    try {
      await notifyClient.sendEmail(
        config.govukNotify.userConfirmationTemplateId,
        req.sessionModel.get('landlord-or-agent-email'),
        {
          personalisation: Object.assign({}, personalisations)
        }
      );

      req.log(
        'info',
        'User Confirmation Email sent successfully'
      );
    } catch (err) {
      const errorDetails = err.response?.data ? `Cause: ${JSON.stringify(err.response.data)}` : '';
      const errorCode = err.code ? `${err.code} -` : '';
      const errorMessage = `${errorCode} ${err.message}; ${errorDetails}`;

      req.log(
        'error',
        'Failed to send User Confirmation Email',
        errorMessage
      );
      throw  Error(errorMessage);
    }
  }

  async sendCaseworkerEmailNotification(req) {
    const personalisations = getPersonalisation('business', req);

    try {
      await notifyClient.sendEmail(
        config.govukNotify.businessConfirmationTemplateId,
        config.govukNotify.caseworkerEmail,
        {
          personalisation: Object.assign({}, personalisations)
        }
      );

      req.log(
        'info',
        'Business Confirmation Email sent successfully'
      );
    } catch (err) {
      const errorDetails = err.response?.data ? `Cause: ${JSON.stringify(err.response.data)}` : '';
      const errorCode = err.code ? `${err.code} -` : '';
      const errorMessage = `${errorCode} ${err.message}; ${errorDetails}`;

      req.log(
        'error',
        'Failed to send Business Confirmation Email',
        errorMessage
      );
      throw Error(errorMessage);
    }
  }

  async send(req) {
    try {
      await this.sendUserEmailNotification(req);
      await this.sendCaseworkerEmailNotification(req);

      req.log('info', 'Request to send notification emails completed successfully.');
    } catch(err) {
      req.log('error', `Failed to send all notifications emails. ${err}`);
      throw err;
    }
  }
};