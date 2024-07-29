module.exports = superclass => class extends superclass {
  configure(req, res, next) {
    const isTenantLivedInProperty = req.sessionModel.get('person-live-in');
    // console.log(isTenantLivedInProperty);
    const isCurrentTenant = isTenantLivedInProperty === 'yes' ? true : false;
    req.sessionModel.set('isCurrentTenant', isCurrentTenant);
    // console.log(req.sessionModel);

    if (!isCurrentTenant) {
      req.form.options.fields['landlord-or-agent-postcode'] = {};
    }
    console.log(req.form.options);
    return super.configure(req, res, next);
  }
};
