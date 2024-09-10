const aggregateTruthyValues = values => Object.values(values).filter(line => line);

module.exports = fieldKey => superclass => class extends superclass {
  successHandler(req, res, next) {
    const currentRoute = req.form.options.route;
    if (fieldKey === 'person-live-in') {
      const isCurrentTenant = req.sessionModel.get(fieldKey) === 'yes' ? true : false;
      req.sessionModel.set('isCurrentTenant', isCurrentTenant);
    }

    if (currentRoute === '/tenant-address') {
      const tenantAddress = aggregateTruthyValues(req.form.values);
      req.sessionModel.set('tenantAddress', tenantAddress);
    }

    return super.successHandler(req, res, next);
  }
};
