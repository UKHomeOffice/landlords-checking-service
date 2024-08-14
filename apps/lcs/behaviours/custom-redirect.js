module.exports = superclass => class extends superclass {
  successHandler(req, res, next) {
    const currentRoute = req.form.options.route;
    const action = req.params.action;

    if (currentRoute === '/tenant-address' && action === 'edit') {
      this.emit('complete', req, res);
      return res.redirect('/rental-property');
    }
    return super.successHandler(req, res, next);
  }
};
