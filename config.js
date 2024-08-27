'use strict';

const env = process.env.NODE_ENV || 'production';

module.exports = {
  PRETTY_DATE_FORMAT: 'DD MMMM YYYY',
  dateTimeFormat: 'DD MMM YYYY HH:mm:ss',
  env: env,
  survey: {
    feedbackUrl: 'https://eforms.homeoffice.gov.uk/outreach/Feedback.ofml?FormName=lcs'
  },
  redis: {
    port: process.env.REDIS_PORT || '6379',
    host: process.env.REDIS_HOST || '127.0.0.1'
  },
  govukNotify: {
    notifyApiKey: process.env.NOTIFY_KEY,
    caseworkerEmail: process.env.CASEWORKER_EMAIL,
    userConfirmationTemplateId: process.env.USER_CONFIRMATION_TEMPLATE_ID,
    businessConfirmationTemplateId: process.env.BUSINESS_CONFIRMATION_TEMPLATE_ID
  },
  dateBefore1988: '1987-12-31',
  dateBefore1989: '1988-12-31'
};
