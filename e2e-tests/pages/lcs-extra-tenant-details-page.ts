import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';

export class lcsExtraTenantDetailsPage extends basePage {
  readonly placeOfBirthElement: Locator;
  readonly nationalInsuranceNoElement: Locator;
  readonly emailElement: Locator;
  readonly telephoneNoElement: Locator;

  constructor(page: Page) {
    super(page);
    this.placeOfBirthElement = page.locator('#extra-tenant-pob');
    this.nationalInsuranceNoElement = page.locator('#extra-tenant-ni-num');
    this.emailElement = page.locator('#extra-tenant-email');
    this.telephoneNoElement = page.locator('#extra-tenant-tel');
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Extra tenant's details – Request a right to rent check – GOV.UK"
      : "Extra tenant's details – Request a right to rent check – GOV.UK";
  }

  async fillInExtraTenantsDetails(date: string, placeOfBirth: string, nationalInsuranceNo: string, email: string, telephoneNo: string) {
    await this.enterDateOrDob(date);
    await this.type(this.placeOfBirthElement, placeOfBirth);
    await this.type(this.nationalInsuranceNoElement, nationalInsuranceNo);
    await this.type(this.emailElement, email);
    await this.type(this.telephoneNoElement, telephoneNo);
  }

  async completeExtraTenantsDetailsPage(date: string, placeOfBirth: string, nationalInsuranceNo: string, email: string, telephoneNo: string) {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.fillInExtraTenantsDetails(date, placeOfBirth, nationalInsuranceNo, email, telephoneNo);
    await this.clickContinueButton();
  }
}