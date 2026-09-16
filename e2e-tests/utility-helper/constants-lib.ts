export const ConstantsLib = {
  RESPONSE_YES: 'Yes',
  RESPONSE_NO: 'No',
  TENANTS_MOVE_IN_DATE: '11/11/2015',
  TENANTS_FULL_NAME: 'HOF Tenant',
  DOB_BEFORE_1988_1960: '01/01/1960',
  DOB_AFTER_1988_1989: '01/01/1989',
  DOB_1978: '01/01/1978',
  DATE_TENANT_MOVE_TO_UK_1978: '01/01/1978',
  ADDRESS_LINE_1: '100',
  ADDRESS_LINE_2: 'Tenth St',
  TOWN_OR_CITY: 'HULL',
  B_COUNTY: 'Salford',
  POSTCODE: 'M11 1HH',
  NATIONALITY: 'Spain',
  REF_NUMBER: 'ZW9005196',
  PLACE_OF_BIRTH: 'London',
  NATIONAL_INSURANCE_NO: 'OK013581D',
  TENANTS_EMAIL: 'Tenants.TestEmail@digital.homeoffice.gov.uk',
  TELEPHONE: '01616699548',
  LAND_LORD_AGENT_NAME: 'HOF LandLord Agent',
  BUSINESS_OR_COMPANY_NAME: 'HOF LTD',
  SAS_HOF_EMAIL: requiredEnv('SAS_HOF_EMAIL'),
  PRIVACY_CONFIRMATION: 'I confirm that I have read, understood and complied with this data protection statement.',
} as const;


function requiredEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`${name} is not configured`);
    }

    return value;
}