import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';

export class lcsProspectiveTenantsCurrentAddressPage extends basePage {
  readonly addressLine1TextField: Locator;
  readonly addressLine2TextField: Locator;
  readonly townOrCityTextField: Locator;
  readonly countyField: Locator;
  readonly postCodeTextField: Locator;

  constructor(page: Page) {
    super(page);
    this.addressLine1TextField = page.locator('#tenant-address-line-1');
    this.addressLine2TextField = page.locator('#tenant-address-line-2');
    this.townOrCityTextField = page.locator('#tenant-town-or-city');
    this.countyField = page.locator('#tenant-county');
    this.postCodeTextField = page.locator('#tenant-postcode');
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Prospective tenant’s current address – Request a right to rent check – GOV.UK'
      : 'Prospective tenant’s current address – Request a right to rent check – GOV.UK';
  }

  async completeProspectiveTenantCurrentAddressPage(address1: string, address2: string, town: string, county: string, postcode: string) {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.type(this.addressLine1TextField, address1);
    await this.type(this.addressLine2TextField, address2);
    await this.type(this.townOrCityTextField, town);
    await this.type(this.countyField, county);
    await this.type(this.postCodeTextField, postcode);
    await this.clickContinueButton();
  }
}