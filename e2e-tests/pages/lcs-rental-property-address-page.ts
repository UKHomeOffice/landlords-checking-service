import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';

export class lcsRentalPropertyAddressPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Rental property address – Request a right to rent check – GOV.UK'
      : 'Rental property address – Request a right to rent check – GOV.UK';
  }

  getChangeLink(): Locator {
    return this.page.getByRole('link', { name: 'Change' });
  }

  async completeRentalPropertyAddressPage() {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.clickContinueButton();
  }
}