const validators = require('hof/controller/validation/validators');
const config = require('../../../config.js');
const dateBefore1988 = config.dateBefore1988;

module.exports = superclass => class extends superclass {
  validateField(key, req) {
    const validationErrorFunc = (type, args) => new this.ValidationError(key, {type: type, arguments: [args]});

    if(key === 'tenant-dob') {
      const dateToBeValidated = req.form.values[key];
      const tenantMovedIn = req.sessionModel.get('when-person-moved-in');

      if(!dateToBeValidated) {
        return validationErrorFunc('required');
      }
      if(tenantMovedIn && !validators.before(dateToBeValidated, tenantMovedIn)) {
        return validationErrorFunc('dobBeforeMovedIn');
      }
    }

    if(key === 'date-tenant-moved-uk') {
      const dateToBeValidated = req.form.values[key];
      const tenantDob = req.sessionModel.get('tenant-dob');

      if(!dateToBeValidated) {
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

    if(key === 'rental-property-postcode') {
      const dependent = req.form.options.fields[key].dependent;
      const dependentValue = req.sessionModel.get(dependent.field);

      if(dependentValue && dependentValue !== dependent.value ) {
        return null;
      }
    }

    if(key === 'landlord-or-agent-tel' || key === 'extra-tenant-tel') {
      const phoneNumber = req.form.values[key];

      if(phoneNumber.length > 0) {
        const phoneNumberWithoutSpace = phoneNumber.replace(/\s+/g, '').trim();
        const isValidphoneNumber = validators.regex(phoneNumberWithoutSpace, /^\(?\+?[\d()-]{8,16}$/);
        if(!isValidphoneNumber  || !validators.internationalPhoneNumber(phoneNumber)) {
          return validationErrorFunc('internationalPhoneNumber');
        }
      }
    }

    return super.validateField(key, req);
  }
};
