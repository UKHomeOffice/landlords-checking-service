import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class lcsDataProtectionStatementPage extends basePage {
  readonly submitRequest: Locator;
  readonly checkboxText: Locator;

  constructor(page: Page) {
    super(page);
    this.submitRequest = page.locator("input[value='Submit request'], button:has-text('Submit request')");
    this.checkboxText = page.locator('#privacy-check');
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Data protection statement – Request a right to rent check – GOV.UK'
      : 'Data protection statement – Request a right to rent check – GOV.UK';
  }

  async selectSubmitRequestButton() {
    await this.click(this.submitRequest);
  }


  async completePrivacyPolicyPage() {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.selectCheckboxOptionWithText(c.PRIVACY_CONFIRMATION);
    await this.click(this.submitRequest);
  }
}