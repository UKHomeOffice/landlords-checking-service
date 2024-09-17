const aggregateTruthyValues = values => Object.values(values).filter(line => line);

module.exports = fieldKey => superclass => class extends superclass {
  successHandler(req, res, next) {
    const currentRoute = req.form.options.route;
    if (fieldKey === 'person-live-in') {
      const isCurrentTenant = req.sessionModel.get(fieldKey) === 'yes' ? true : false;
      req.sessionModel.set('isCurrentTenant', isCurrentTenant);
      if(isCurrentTenant) {
        const personMoveInDate = req.form.values['when-person-moved-in'];
        req.sessionModel.set('personMoveInDate', personMoveInDate);
      }
    }

    if (currentRoute === '/tenant-address') {
      const tenantAddress = aggregateTruthyValues(req.form.values);
      req.sessionModel.set('tenantAddress', tenantAddress);
    }

    return super.successHandler(req, res, next);
  }

  getValues(req, res, next) {
    if (req.form.options.route === '/property-occupied' && req.params.action === 'edit') {
      if(req.sessionModel.get('personMoveInDate')) {
        req.sessionModel.set('when-person-moved-in', req.sessionModel.get('personMoveInDate'));
      }
    }
    return super.getValues(req, res, next);
  }
};
