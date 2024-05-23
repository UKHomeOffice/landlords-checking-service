module.exports = superclass => class extends superclass {
  successHandler(req, res, next) {
    return super.successHandler(req, res, next);
  }
};
