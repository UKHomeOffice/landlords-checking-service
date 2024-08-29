const validators = require('hof/controller/validation/validators');
const config = require('../../../config.js');
const dateBefore1988 = config.dateBefore1988;

module.exports = superclass => class extends superclass {
  validateField(key, req) {
    const validationErrorFunc = (type, args) => new this.ValidationError(key, {type: type, arguments: [args]});

    if(key === 'tenant-dob') {
      const dateToBeValidated = req.form.values[key];
      const tenantMovedIn = req.sessionModel.get('when-person-moved-in');

      if(dateToBeValidated) {
        return validationErrorFunc('required');
      }
      if(tenantMovedIn && !validators.after(dateToBeValidated, tenantMovedIn)) {
        return validationErrorFunc('dobBeforeMovedIn');
      }
    }

    if(key === 'date-tenant-moved-uk') {
      const dateToBeValidated = req.form.values[key];
      const tenantDob = req.sessionModel.get('tenant-dob');

      if(dateToBeValidated) {
        return validationErrorFunc('required');
      }
      if(req.sessionModel.get('before-or-after-1988') === 'yes'
      && !validators.before(dateToBeValidated, dateBefore1988)) {
        return validationErrorFunc('before');
      }
      if(!validators.after(dateToBeValidated, '120', 'years')) {
        return validationErrorFunc('after120years');
      }
      if(!validators.after(dateToBeValidated, tenantDob)) {
        return validationErrorFunc('dateAfterDob');
      }
    }

    return super.validateField(key, req);
  }
};
