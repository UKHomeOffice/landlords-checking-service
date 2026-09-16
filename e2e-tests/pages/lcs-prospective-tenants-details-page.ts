import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';

export class lcsProspectiveTenantsDetailsPage extends basePage {
  readonly fullNameField: Locator;
  readonly countryOfNationalityField: Locator;
  readonly homeOfficeReferenceNumberField: Locator;

  constructor(page: Page) {
    super(page);
    this.fullNameField = page.locator('#tenant-full-name');
    this.countryOfNationalityField = page.locator('#tenant-nationality');
    this.homeOfficeReferenceNumberField = page.locator('#ho-ref-number');
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Prospective tenant's details – Request a right to rent check – GOV.UK"
      : "Prospective tenant's details – Request a right to rent check – GOV.UK";
  }

  async completeProspectiveTenantsDetailsPage(fullName: string, dob: string, nationality: string, refNumber: string) {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.type(this.fullNameField, fullName);
    await this.enterDateOrDob(dob);
    await this.type(this.countryOfNationalityField, nationality);
    await this.type(this.homeOfficeReferenceNumberField, refNumber);
    await this.clickContinueButton();
  }
}