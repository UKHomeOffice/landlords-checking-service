const { shouldRedirectToBefore1988 } = require('../../../utils/index.js');

module.exports = superclass => class extends superclass {
  successHandler(req, res, next) {
    const currentRoute = req.form.options.route;
    const action = req.params.action;

    if (currentRoute === '/tenant-address' && action === 'edit' && req.sessionModel.get('isCurrentTenant')) {
      this.emit('complete', req, res);
      return res.redirect('/rental-property');
    }

    if (currentRoute === '/tenant-details' && action === 'edit') {
      if(shouldRedirectToBefore1988(req.sessionModel.get('tenant-dob'))  &&
      !req.sessionModel.get('steps').includes('/before-1988')) {
        this.emit('complete', req, res);
        return res.redirect('/before-1988');
      }
    }

    if (currentRoute === '/property-occupied' && action === 'edit') {
      const personLiveIn = req.form.values['person-live-in'];
      const rentalPropertyPostcode = req.sessionModel.get('rental-property-postcode');
      if (personLiveIn === 'no' && !rentalPropertyPostcode) {
        this.emit('complete', req, res);
        return res.redirect('/landlord-information');
      }
    }
    return super.successHandler(req, res, next);
  }
};
