module.exports = superclass => class extends superclass {
  configure(req, res, next) {
    const isTenantLivedInProperty = req.sessionModel.get('person-live-in');
    const isCurrentTenant = isTenantLivedInProperty === 'yes' ? true : false;
    req.sessionModel.set('isCurrentTenant', isCurrentTenant);
    if (!isCurrentTenant) {
      req.form.options.fields['landlord-or-agent-postcode'] = {};
    }
    return super.configure(req, res, next);
  }
};
