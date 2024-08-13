module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    if (req.sessionModel.get('steps').includes('/tenant-address')) {
      req.sessionModel.set('tenant-address-line-2', req.form.values['tenant-address-line-2']);
      req.sessionModel.set('tenant-town-or-city', req.form.values['tenant-town-or-city']);
      req.sessionModel.set('tenant-county', req.form.values['tenant-county']);
      req.sessionModel.set('tenant-postcode', req.form.values['tenant-postcode']);
      req.sessionModel.set('tenant-address-line-1', req.form.values['tenant-address-line-1']);
      return res.redirect('/rental-property');
    }

    return super.saveValues(req, res, next);
  }
};
