const moment = require('moment');

module.exports = config => (fieldKey, localKey) => superclass => class extends superclass {
  successHandler(req, res, next) {
    const fieldValue = req.sessionModel.get(fieldKey);

    if (fieldValue) {
      const valuesEnriched = req.sessionModel.get('valuesEnriched') || {};

      if (fieldKey === 'person-live-in') {
        valuesEnriched[localKey] = req.translate(`journey.tenantType.${fieldValue}`);
      }
      if (fieldKey === 'tenant-dob') {
        valuesEnriched[localKey] = moment(fieldValue).format(config.PRETTY_DATE_FORMAT);
      }

      req.sessionModel.set('valuesEnriched', valuesEnriched);
    }
    return super.successHandler(req, res, next);
  }
};
