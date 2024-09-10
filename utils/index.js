const translation = require('../apps/lcs/translations/src/en/fields.json');

const getLabel = (fieldKey, fieldValue) => {
  if (Array.isArray(fieldValue)) {
    return fieldValue.map(option => translation[fieldKey].options[option].label).join(', ');
  }
  return translation[fieldKey].options[fieldValue].label;
};

module.exports = { getLabel };
