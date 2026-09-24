import { test as base } from 'playwright-bdd';
import { basePage } from '../pages/base-page';
import { lcsCheckRequestedPage } from '../pages/lcs-check-requested-page';
import { lcsDataProtectionStatementPage } from '../pages/lcs-data-protection-statement-page';
import { lcsDoesThePersonAlreadyLiveInYourPropertyPage } from '../pages/lcs-does-the-person-already-live-in-your-property-page';
import { lcsExtraTenantDetailsPage } from '../pages/lcs-extra-tenant-details-page';
import { lcsHasTheProspectiveTenantBeenInTheUkBefore1988Page } from '../pages/lcs-has-the-prospective-tenant-been-in-the-uk-before-1988-page';
import { lcsHasTheTenantBeenInTheUkBefore1988Page } from '../pages/lcs-has-the-tenant-been-in-the-uk-before-1988-page';
import { lcsLandlordOrAgentDetailsPage } from '../pages/lcs-landlord-or-agent-details-page';
import { lcsProspectiveTenantsCurrentAddressPage } from '../pages/lcs-prospective-tenants-current-address-page';
import { lcsProspectiveTenantsDetailsPage } from '../pages/lcs-prospective-tenants-details-page';
import { lcsRentalPropertyAddressPage } from '../pages/lcs-rental-property-address-page';
import { lcsStartPage } from '../pages/lcs-start-page';
import { lcsSummaryPage } from '../pages/lcs-summary-page';
import { lcsTenantsCurrentAddressPage } from '../pages/lcs-tenants-current-address-page';
import { lcsTenantsDetailsPage } from '../pages/lcs-tenants-details-page';

export type Pages = {
  basePage: basePage;
  lcsStartPage: lcsStartPage;
  lcsDoesThePersonAlreadyLiveInYourPropertyPage: lcsDoesThePersonAlreadyLiveInYourPropertyPage;
  lcsTenantsDetailsPage: lcsTenantsDetailsPage;
  lcsProspectiveTenantsDetailsPage: lcsProspectiveTenantsDetailsPage;
  lcsTenantsCurrentAddressPage: lcsTenantsCurrentAddressPage;
  lcsProspectiveTenantsCurrentAddressPage: lcsProspectiveTenantsCurrentAddressPage;
  lcsHasTheTenantBeenInTheUkBefore1988Page: lcsHasTheTenantBeenInTheUkBefore1988Page;
  lcsHasTheProspectiveTenantBeenInTheUkBefore1988Page: lcsHasTheProspectiveTenantBeenInTheUkBefore1988Page;
  lcsExtraTenantDetailsPage: lcsExtraTenantDetailsPage;
  lcsLandlordOrAgentDetailsPage: lcsLandlordOrAgentDetailsPage;
  lcsRentalPropertyAddressPage: lcsRentalPropertyAddressPage;
  lcsSummaryPage: lcsSummaryPage;
  lcsDataProtectionStatementPage: lcsDataProtectionStatementPage;
  lcsCheckRequestedPage: lcsCheckRequestedPage;
};

export const test = base.extend<{ pages: Pages }>({
  pages: async ({ page }, use) => {
    await use({
      basePage: new basePage(page),
      lcsStartPage: new lcsStartPage(page),
      lcsDoesThePersonAlreadyLiveInYourPropertyPage: new lcsDoesThePersonAlreadyLiveInYourPropertyPage(page),
      lcsTenantsDetailsPage: new lcsTenantsDetailsPage(page),
      lcsProspectiveTenantsDetailsPage: new lcsProspectiveTenantsDetailsPage(page),
      lcsTenantsCurrentAddressPage: new lcsTenantsCurrentAddressPage(page),
      lcsProspectiveTenantsCurrentAddressPage: new lcsProspectiveTenantsCurrentAddressPage(page),
      lcsHasTheTenantBeenInTheUkBefore1988Page: new lcsHasTheTenantBeenInTheUkBefore1988Page(page),
      lcsHasTheProspectiveTenantBeenInTheUkBefore1988Page: new lcsHasTheProspectiveTenantBeenInTheUkBefore1988Page(page),
      lcsExtraTenantDetailsPage: new lcsExtraTenantDetailsPage(page),
      lcsLandlordOrAgentDetailsPage: new lcsLandlordOrAgentDetailsPage(page),
      lcsRentalPropertyAddressPage: new lcsRentalPropertyAddressPage(page),
      lcsSummaryPage: new lcsSummaryPage(page),
      lcsDataProtectionStatementPage: new lcsDataProtectionStatementPage(page),
      lcsCheckRequestedPage: new lcsCheckRequestedPage(page),
    });
  },
});

export const expect = test.expect;