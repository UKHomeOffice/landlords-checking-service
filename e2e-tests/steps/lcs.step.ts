import { expect } from '@playwright/test';
import { DataTable } from '@cucumber/cucumber';
import { createBdd } from 'playwright-bdd';
import { test } from '../fixture/fixtures';
import type { Pages } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export const { Given, When, Then } = createBdd(test);

Given('I visit the Landlords checking service page', async ({ pages }) => {
    await pages.lcsStartPage.openLcs();
});

When('I fill out my answers for LCS {string}', async ({ pages }, scenarioText: string) => {

    await pages.lcsStartPage.clickStartNow();

    switch (scenarioText.toLowerCase()) {
        case 'living in property, born before 1988 and has been in uk before 1988 answer is yes':
            await pages.lcsDoesThePersonAlreadyLiveInYourPropertyPage.completeDoesThePersonAlreadyLiveInYourPropertyPage(c.RESPONSE_YES, c.TENANTS_MOVE_IN_DATE);
            await pages.lcsTenantsDetailsPage.completeTenantsDetailsPage(c.TENANTS_FULL_NAME, c.DOB_BEFORE_1988_1960, c.NATIONALITY, c.REF_NUMBER);
            await pages.lcsTenantsCurrentAddressPage.completeTenantCurrentAddressPage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.B_COUNTY, c.POSTCODE);
            await pages.lcsHasTheTenantBeenInTheUkBefore1988Page.completeHasTheTenantBeenInUkBefore1988Page(c.RESPONSE_YES);
            await pages.lcsExtraTenantDetailsPage.completeExtraTenantsDetailsPage(c.DATE_TENANT_MOVE_TO_UK_1978, c.PLACE_OF_BIRTH, c.NATIONAL_INSURANCE_NO, c.TENANTS_EMAIL, c.TELEPHONE);
            await pages.lcsLandlordOrAgentDetailsPage.completeLandlordsOrAgentsWithOutPostcodeDetailsPage(c.LAND_LORD_AGENT_NAME, c.BUSINESS_OR_COMPANY_NAME, c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.lcsRentalPropertyAddressPage.completeRentalPropertyAddressPage();
            break;

        case 'living in property, born before 1988 and has been in uk before 1988 answer is no':
            await pages.lcsDoesThePersonAlreadyLiveInYourPropertyPage.completeDoesThePersonAlreadyLiveInYourPropertyPage(c.RESPONSE_YES, c.TENANTS_MOVE_IN_DATE);
            await pages.lcsTenantsDetailsPage.completeTenantsDetailsPage(c.TENANTS_FULL_NAME, c.DOB_BEFORE_1988_1960, c.NATIONALITY, c.REF_NUMBER);
            await pages.lcsTenantsCurrentAddressPage.completeTenantCurrentAddressPage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.B_COUNTY, c.POSTCODE);
            await pages.lcsHasTheTenantBeenInTheUkBefore1988Page.completeHasTheTenantBeenInUkBefore1988Page(c.RESPONSE_NO);
            await pages.lcsLandlordOrAgentDetailsPage.completeLandlordsOrAgentsWithOutPostcodeDetailsPage(c.LAND_LORD_AGENT_NAME, c.BUSINESS_OR_COMPANY_NAME, c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.lcsRentalPropertyAddressPage.completeRentalPropertyAddressPage();
            break;

        case 'not living in property, born before 1988 and has been in uk before 1988 answer is yes':
            await pages.lcsDoesThePersonAlreadyLiveInYourPropertyPage.completeDoesThePersonAlreadyLiveInYourPropertyPage(c.RESPONSE_NO, '');
            await pages.lcsProspectiveTenantsDetailsPage.completeProspectiveTenantsDetailsPage(c.TENANTS_FULL_NAME, c.DOB_BEFORE_1988_1960, c.NATIONALITY, c.REF_NUMBER);
            await pages.lcsProspectiveTenantsCurrentAddressPage.completeProspectiveTenantCurrentAddressPage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.B_COUNTY, c.POSTCODE);
            await pages.lcsHasTheProspectiveTenantBeenInTheUkBefore1988Page.completeHasTheProspectiveTenantBeenInUkBefore1988Page(c.RESPONSE_YES);
            await pages.lcsExtraTenantDetailsPage.completeExtraTenantsDetailsPage(c.DATE_TENANT_MOVE_TO_UK_1978, c.PLACE_OF_BIRTH, c.NATIONAL_INSURANCE_NO, c.TENANTS_EMAIL, c.TELEPHONE);
            await pages.lcsLandlordOrAgentDetailsPage.completeLandlordsOrAgentsWithPostcodeDetailsPage(c.LAND_LORD_AGENT_NAME, c.POSTCODE, c.BUSINESS_OR_COMPANY_NAME, c.SAS_HOF_EMAIL, c.TELEPHONE);
            break;

        case 'not living in property, born before 1988 and has been in uk before 1988 answer is no':
            await pages.lcsDoesThePersonAlreadyLiveInYourPropertyPage.completeDoesThePersonAlreadyLiveInYourPropertyPage(c.RESPONSE_NO, '');
            await pages.lcsProspectiveTenantsDetailsPage.completeProspectiveTenantsDetailsPage(c.TENANTS_FULL_NAME, c.DOB_BEFORE_1988_1960, c.NATIONALITY, c.REF_NUMBER);
            await pages.lcsProspectiveTenantsCurrentAddressPage.completeProspectiveTenantCurrentAddressPage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.B_COUNTY, c.POSTCODE);
            await pages.lcsHasTheProspectiveTenantBeenInTheUkBefore1988Page.completeHasTheProspectiveTenantBeenInUkBefore1988Page(c.RESPONSE_NO);
            await pages.lcsLandlordOrAgentDetailsPage.completeLandlordsOrAgentsWithPostcodeDetailsPage(c.LAND_LORD_AGENT_NAME, c.POSTCODE, c.BUSINESS_OR_COMPANY_NAME, c.SAS_HOF_EMAIL, c.TELEPHONE);
            break;

        case 'not living in property, born after 1988':
            await pages.lcsDoesThePersonAlreadyLiveInYourPropertyPage.completeDoesThePersonAlreadyLiveInYourPropertyPage(c.RESPONSE_NO, '');
            await pages.lcsProspectiveTenantsDetailsPage.completeProspectiveTenantsDetailsPage(c.TENANTS_FULL_NAME, c.DOB_AFTER_1988_1989, c.NATIONALITY, c.REF_NUMBER);
            await pages.lcsProspectiveTenantsCurrentAddressPage.completeProspectiveTenantCurrentAddressPage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.B_COUNTY, c.POSTCODE);
            await pages.lcsLandlordOrAgentDetailsPage.completeLandlordsOrAgentsWithPostcodeDetailsPage(c.LAND_LORD_AGENT_NAME, c.POSTCODE, c.BUSINESS_OR_COMPANY_NAME, c.SAS_HOF_EMAIL, c.TELEPHONE);
            break;

        case 'living in property, born after 1988':
            await pages.lcsDoesThePersonAlreadyLiveInYourPropertyPage.completeDoesThePersonAlreadyLiveInYourPropertyPage(c.RESPONSE_YES, c.TENANTS_MOVE_IN_DATE);
            await pages.lcsTenantsDetailsPage.completeTenantsDetailsPage(c.TENANTS_FULL_NAME, c.DOB_AFTER_1988_1989, c.NATIONALITY, c.REF_NUMBER);
            await pages.lcsTenantsCurrentAddressPage.completeTenantCurrentAddressPage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.B_COUNTY, c.POSTCODE);
            await pages.lcsLandlordOrAgentDetailsPage.completeLandlordsOrAgentsWithOutPostcodeDetailsPage(c.LAND_LORD_AGENT_NAME, c.BUSINESS_OR_COMPANY_NAME, c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.lcsRentalPropertyAddressPage.completeRentalPropertyAddressPage();
            break;

        case 'dob is 30/12/1987, has been in uk before 1988 answer is yes and date tenant moved to the uk is 31/12/1987':
            await pages.lcsDoesThePersonAlreadyLiveInYourPropertyPage.completeDoesThePersonAlreadyLiveInYourPropertyPage(c.RESPONSE_YES, c.TENANTS_MOVE_IN_DATE);
            await pages.lcsTenantsDetailsPage.completeTenantsDetailsPage(c.TENANTS_FULL_NAME, '30/12/1987', c.NATIONALITY, c.REF_NUMBER);
            await pages.lcsTenantsCurrentAddressPage.completeTenantCurrentAddressPage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.B_COUNTY, c.POSTCODE);
            await pages.lcsHasTheTenantBeenInTheUkBefore1988Page.completeHasTheTenantBeenInUkBefore1988Page(c.RESPONSE_YES);
            await pages.lcsExtraTenantDetailsPage.completeExtraTenantsDetailsPage('31/12/1987', c.PLACE_OF_BIRTH, c.NATIONAL_INSURANCE_NO, c.TENANTS_EMAIL, c.TELEPHONE);
            await pages.lcsLandlordOrAgentDetailsPage.completeLandlordsOrAgentsWithOutPostcodeDetailsPage(c.LAND_LORD_AGENT_NAME, c.BUSINESS_OR_COMPANY_NAME, c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.lcsRentalPropertyAddressPage.completeRentalPropertyAddressPage();
            break;

        case 'living in property, dob is 31/12/1987 then has been in uk before 1988 page bypassed':
            await pages.lcsDoesThePersonAlreadyLiveInYourPropertyPage.completeDoesThePersonAlreadyLiveInYourPropertyPage(c.RESPONSE_YES, c.TENANTS_MOVE_IN_DATE);
            await pages.lcsTenantsDetailsPage.completeTenantsDetailsPage(c.TENANTS_FULL_NAME, '31/12/1987', c.NATIONALITY, c.REF_NUMBER);
            await pages.lcsTenantsCurrentAddressPage.completeTenantCurrentAddressPage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.B_COUNTY, c.POSTCODE);
            await pages.lcsLandlordOrAgentDetailsPage.completeLandlordsOrAgentsWithOutPostcodeDetailsPage(c.LAND_LORD_AGENT_NAME, c.BUSINESS_OR_COMPANY_NAME, c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.lcsRentalPropertyAddressPage.completeRentalPropertyAddressPage();
            break;

        default:
            throw new Error(`Failed: Wrong scenario text: ${scenarioText}`);
    }
    await pages.lcsSummaryPage.completeSummaryPage();
    await pages.lcsDataProtectionStatementPage.completePrivacyPolicyPage();
});

When('I navigate to {string} page', async ({ pages }, pageName: string) => {
    // await new lcsStepLib(pages).pageToNavigateTo(pageName);

    switch (pageName.toLowerCase()) {
        case 'start page':
            await pages.lcsStartPage.assertPageTitle(pages.basePage.page, await pages.lcsStartPage.expectedPageTitle());
            break;

        case 'does the person already live in your property?':
            await pages.lcsStartPage.clickStartNow();
            break;

        case "tenant's details":
            await pages.lcsStartPage.clickStartNow();
            await pages.lcsDoesThePersonAlreadyLiveInYourPropertyPage.completeDoesThePersonAlreadyLiveInYourPropertyPage(c.RESPONSE_YES, c.TENANTS_MOVE_IN_DATE);
            break;

        case "tenant's current address":
            await pages.lcsStartPage.clickStartNow();
            await pages.lcsDoesThePersonAlreadyLiveInYourPropertyPage.completeDoesThePersonAlreadyLiveInYourPropertyPage(c.RESPONSE_YES, c.TENANTS_MOVE_IN_DATE);
            await pages.lcsTenantsDetailsPage.completeTenantsDetailsPage(c.TENANTS_FULL_NAME, c.DOB_BEFORE_1988_1960, c.NATIONALITY, c.REF_NUMBER);
            break

        case 'has the current tenant been in the uk since before 1988?':
            await pages.lcsStartPage.clickStartNow();
            await pages.lcsDoesThePersonAlreadyLiveInYourPropertyPage.completeDoesThePersonAlreadyLiveInYourPropertyPage(c.RESPONSE_YES, c.TENANTS_MOVE_IN_DATE);
            await pages.lcsTenantsDetailsPage.completeTenantsDetailsPage(c.TENANTS_FULL_NAME, c.DOB_BEFORE_1988_1960, c.NATIONALITY, c.REF_NUMBER);
            await pages.lcsTenantsCurrentAddressPage.completeTenantCurrentAddressPage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.B_COUNTY, c.POSTCODE);
            break;

        case "extra tenant's details":
            await pages.lcsStartPage.clickStartNow();
            await pages.lcsDoesThePersonAlreadyLiveInYourPropertyPage.completeDoesThePersonAlreadyLiveInYourPropertyPage(c.RESPONSE_YES, c.TENANTS_MOVE_IN_DATE);
            await pages.lcsTenantsDetailsPage.completeTenantsDetailsPage(c.TENANTS_FULL_NAME, c.DOB_BEFORE_1988_1960, c.NATIONALITY, c.REF_NUMBER);
            await pages.lcsTenantsCurrentAddressPage.completeTenantCurrentAddressPage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.B_COUNTY, c.POSTCODE);
            await pages.lcsHasTheTenantBeenInTheUkBefore1988Page.completeHasTheTenantBeenInUkBefore1988Page(c.RESPONSE_YES);
            break;

        case "landlord's or agent's details":
            await pages.lcsStartPage.clickStartNow();
            await pages.lcsDoesThePersonAlreadyLiveInYourPropertyPage.completeDoesThePersonAlreadyLiveInYourPropertyPage(c.RESPONSE_NO, '');
            await pages.lcsProspectiveTenantsDetailsPage.completeProspectiveTenantsDetailsPage(c.TENANTS_FULL_NAME, c.DOB_BEFORE_1988_1960, c.NATIONALITY, c.REF_NUMBER);
            await pages.lcsProspectiveTenantsCurrentAddressPage.completeProspectiveTenantCurrentAddressPage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.B_COUNTY, c.POSTCODE);
            await pages.lcsHasTheProspectiveTenantBeenInTheUkBefore1988Page.completeHasTheProspectiveTenantBeenInUkBefore1988Page(c.RESPONSE_YES);
            await pages.lcsExtraTenantDetailsPage.completeExtraTenantsDetailsPage(c.DOB_1978, c.PLACE_OF_BIRTH, c.NATIONAL_INSURANCE_NO, c.TENANTS_EMAIL, c.TELEPHONE);
            break;

        case 'privacy policy':
            await pages.lcsStartPage.clickStartNow();
            await pages.lcsDoesThePersonAlreadyLiveInYourPropertyPage.completeDoesThePersonAlreadyLiveInYourPropertyPage(c.RESPONSE_YES, c.TENANTS_MOVE_IN_DATE);
            await pages.lcsTenantsDetailsPage.completeTenantsDetailsPage(c.TENANTS_FULL_NAME, c.DOB_BEFORE_1988_1960, c.NATIONALITY, c.REF_NUMBER);
            await pages.lcsTenantsCurrentAddressPage.completeTenantCurrentAddressPage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.B_COUNTY, c.POSTCODE);
            await pages.lcsHasTheTenantBeenInTheUkBefore1988Page.completeHasTheTenantBeenInUkBefore1988Page(c.RESPONSE_YES);
            await pages.lcsExtraTenantDetailsPage.completeExtraTenantsDetailsPage(c.DOB_1978, c.PLACE_OF_BIRTH, c.NATIONAL_INSURANCE_NO, c.TENANTS_EMAIL, c.TELEPHONE);
            await pages.lcsLandlordOrAgentDetailsPage.completeLandlordsOrAgentsWithOutPostcodeDetailsPage(c.LAND_LORD_AGENT_NAME, c.BUSINESS_OR_COMPANY_NAME, c.SAS_HOF_EMAIL, c.TELEPHONE);
            await pages.lcsRentalPropertyAddressPage.completeRentalPropertyAddressPage();
            await pages.lcsSummaryPage.completeSummaryPage();
            break;

        default:
            throw new Error(`Failed: Wrong page name: ${pageName}`);
    }
});

When('I select {string} link', async ({ pages }, linkText: string) => {
    switch (linkText.toLowerCase()) {
        case 'ask to see relevant documents':
            await pages.lcsStartPage.clickRelevantDocumentsLink();
            break;

        case 'checking guide':
            await pages.lcsStartPage.clickCheckingGuideLink();
            break;

        case 'read more about how the home office uses personal data':
            await pages.lcsCheckRequestedPage.clickPersonalInformationCharterLink();
            break;

        default:
            throw new Error(`Failed: Wrong link text: ${linkText}`);
    }
});

When('I select {string} and enter tenant move in date as {string}', async ({ pages }, option: string, dateValue: string) => {
    await pages.lcsDoesThePersonAlreadyLiveInYourPropertyPage.selectYesOrNoRadioOption(option);

    if (dateValue.trim()) {
        await pages.lcsDoesThePersonAlreadyLiveInYourPropertyPage.enterDateOrDob(dateValue);
    }
});

When('I select to continue', async ({ pages }) => {
    await pages.basePage.clickContinueButton();
});

When('I select continue', async ({ pages }) => {
    await pages.basePage.clickContinueButton();
});

When('I select to submit request', async ({ pages }) => {
    await pages.lcsDataProtectionStatementPage.selectSubmitRequestButton();
});

When('I fill in the fields below with for tenant\'s details:', async ({ pages }, dataTable: DataTable) => {
    const data = dataTable.rowsHash();

    await pages.lcsTenantsDetailsPage.completeTenantsDetailsPage(
        data['Full name'],
        data['Date of birth'],
        data['Country of nationality'],
        data['HO reference number']
    );
});

When('I fill in the fields below with tenant\'s current address details:', async ({ pages }, dataTable: DataTable) => {
    const data = dataTable.rowsHash();

    await pages.lcsTenantsCurrentAddressPage.completeTenantCurrentAddressPage(
        data['Address Line 1'],
        data['Address Line 2'],
        data['Town or City'],
        data['Country'],
        data['Postcode']
    );
});

When('I fill in the fields below with extra tenant\'s details:', async ({ pages }, dataTable: DataTable) => {
    const data = dataTable.rowsHash();

    await pages.lcsExtraTenantDetailsPage.completeExtraTenantsDetailsPage(
        data['Date tenant moved to the UK'],
        data['Place of birth'],
        data['National Insurance number'],
        data['Email address'],
        data['Telephone number']
    );
});

When('I fill in the fields below with landlord\'s or agent\'s with postcode details:', async ({ pages }, dataTable: DataTable) => {
    const data = dataTable.rowsHash();

    await pages.lcsLandlordOrAgentDetailsPage.completeLandlordsOrAgentsWithPostcodeDetailsPage(
        data['Landlord full name'],
        data['Postcode'],
        data['Company name'],
        data['Email'],
        data['Telephone number']
    );
});

Then('{string} text is displayed as page header for LCS', async ({ pages }, expectedPageHeaderText: string) => {
    const actualPageHeaderText = await pages.basePage.headerText.textContent();
    expect(actualPageHeaderText?.trim()).toEqual(expectedPageHeaderText);
});

Then('Request another check button is displayed for LCS', async ({ pages }) => {
    await expect(pages.lcsCheckRequestedPage.requestAnotherCheckButton).toBeVisible();
});

Then('I will be redirected to the correct page {string}', async ({ pages }, pageTitle: string) => {
    // await new lcsStepLib(pages).assertPageTitle(pageTitle);
    await pages.basePage.assertPageTitle(pages.basePage.page, pageTitle);
});

Then('I should see {string} error message displayed', async ({ pages }, expectedErrorMessage: string) => {
    const actualErrorMessage = await pages.basePage.getThereIsAProblemTextErrorText();
    expect(actualErrorMessage?.trim()).toEqual(expectedErrorMessage);
});

Then('I should see {string} error summary', async ({ pages }, expectedErrorMessage: string) => {
    const expectedErrorArray = expectedErrorMessage.trim().split('¬');
    const actualText = await pages.basePage.getErrorSummaryListText();
    const actualErrorArray = actualText!
        .replaceAll('\t', '')
        .trim()
        .split(/\r?\n/)
        .map((value) => value.trim())
        .filter(Boolean);

    expect(actualErrorArray).toEqual(expectedErrorArray);
});