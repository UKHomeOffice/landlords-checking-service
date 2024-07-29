const validators = require('hof/controller/validation/validators');
const config = require('../../../config.js');
const dateBefore1988 = config.dateBefore1988;

module.exports = superclass => class extends superclass {
  validateField(key, req) {
    const validationErrorFunc = (type, args) => new this.ValidationError(key, {type: type, arguments: [args]});

    if(key === 'date-tenant-moved-uk') {
      const DateToBeValidated = req.form.values[key];
      const tenantDob = req.sessionModel.get('tenant-dob');
      if(req.sessionModel.get('before-or-after-1988') === 'yes'
      && !validators.before(DateToBeValidated, dateBefore1988)) {
        return validationErrorFunc('before');
      }
      if(!validators.after(DateToBeValidated, '120', 'years')) {
        return validationErrorFunc('after120years');
      }
      if(!validators.after(DateToBeValidated, tenantDob)) {
        return validationErrorFunc('dateAfterDob');
      }
    }
    return super.validateField(key, req);
  }
};
