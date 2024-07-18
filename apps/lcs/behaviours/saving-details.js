module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    const isTenantLivedInProperty = req.form.values['person-live-in'];
    const isCurrentTenant = isTenantLivedInProperty === 'yes' ? true : false;
    req.sessionModel.set('isCurrentTenant', isCurrentTenant);
    return super.saveValues(req, res, next);
  }
};
