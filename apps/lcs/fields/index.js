const moment = require('moment');
const config = require('../../../config');
const dateComponent = require('hof').components.date;
const countries = require('hof').utils.countries();

module.exports = {
  'privacy-check': {
    mixin: 'checkbox',
    validate: ['required']
  }
};
