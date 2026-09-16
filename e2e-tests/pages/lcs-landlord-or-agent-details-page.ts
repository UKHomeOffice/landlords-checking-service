import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';

export class lcsLandlordOrAgentDetailsPage extends basePage {
  readonly landlordFullNameField: Locator;
  readonly rentalPostcodeField: Locator;
  readonly companyNameField: Locator;
  readonly emailAddressField: Locator;
  readonly telephoneNoField: Locator;

  constructor(page: Page) {
    super(page);
    this.landlordFullNameField = page.locator('#landlord-or-agent-name');
    this.rentalPostcodeField = page.locator('#rental-property-postcode');
    this.companyNameField = page.locator('#landlord-or-agent-company');
    this.emailAddressField = page.locator('#landlord-or-agent-email');
    this.telephoneNoField = page.locator('#landlord-or-agent-tel');
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Landlord's or agent's details – Request a right to rent check – GOV.UK"
      : "Landlord's or agent's details – Request a right to rent check – GOV.UK";
  }

  async completeLandlordsOrAgentsWithOutPostcodeDetailsPage(fullName: string, companyName: string, email: string, telephoneNo: string) {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.type(this.landlordFullNameField, fullName);
    await this.type(this.companyNameField, companyName);
    await this.type(this.emailAddressField, email);
    await this.type(this.telephoneNoField, telephoneNo);
    await this.clickContinueButton();
  }

  async completeLandlordsOrAgentsWithPostcodeDetailsPage(fullName: string, postcode: string, companyName: string, email: string, telephoneNo: string) {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.type(this.landlordFullNameField, fullName);
    await this.type(this.rentalPostcodeField, postcode);
    await this.type(this.companyNameField, companyName);
    await this.type(this.emailAddressField, email);
    await this.type(this.telephoneNoField, telephoneNo);
    await this.clickContinueButton();
  }
}