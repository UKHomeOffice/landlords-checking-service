import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';

export class lcsCheckRequestedPage extends basePage {
  readonly requestAnotherCheckButton: Locator;

  constructor(page: Page) {
    super(page);
    this.requestAnotherCheckButton = page.getByRole('button', { name: 'Request another check' });
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Right to rent check requested – Request a right to rent check – GOV.UK'
      : 'Right to rent check requested – Request a right to rent check – GOV.UK';
  }

  async clickPersonalInformationCharterLink() {
    await this.click(this.page.getByRole('link', { name: 'read more about how the Home Office uses personal data' }));
  }
}