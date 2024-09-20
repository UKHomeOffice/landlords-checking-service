const translation = require('../apps/lcs/translations/src/en/fields.json');
const config = require('../config.js');

const getLabel = (fieldKey, fieldValue) => {
  if (Array.isArray(fieldValue)) {
    return fieldValue.map(option => translation[fieldKey].options[option].label).join(', ');
  }
  return translation[fieldKey].options[fieldValue].label;
};

/**
 * Checks if the user should be redirected to the '/before-1988' page based on the tenant's date of birth.
 *
 * @param {string} tenantDob - The tenant's date of birth in ISO format.
 * @param {string} startOf1988 - The start date of year 1988 in ISO format.
 * @returns {boolean} - Returns true if the tenant's DOB is before the start of 1988 and not equal to the excluded date.
 */
const shouldRedirectToBefore1988 = tenantDob => {
  const excludedDate = '1987-12-31';
  /**
   * If the tenant's date of birth is before the cutoff date and not equal to 1987-12-31,
   * then redirect to '/before-1988'. This allows tenants born on 1987-12-30 to enter
   * 1987-12-31 as their date of entry to the UK on the '/extra-tenant-details' page and progress.
   */
  return tenantDob < config.startOf1988 && tenantDob !== excludedDate;
};

module.exports = { getLabel, shouldRedirectToBefore1988 };
