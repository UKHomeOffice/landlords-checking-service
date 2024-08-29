module.exports = fieldKey => superclass => class extends superclass {
  successHandler(req, res, next) {
    if (fieldKey === 'person-live-in') {
      const isCurrentTenant = req.sessionModel.get(fieldKey) === 'yes' ? true : false;
      req.sessionModel.set('isCurrentTenant', isCurrentTenant);
    }
    return super.successHandler(req, res, next);
  }
};
