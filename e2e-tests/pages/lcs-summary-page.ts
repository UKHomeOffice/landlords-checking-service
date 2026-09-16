import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class lcsSummaryPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Summary – Request a right to rent check – GOV.UK'
      : 'Summary – Request a right to rent check – GOV.UK';
  }

  async completeSummaryPage() {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.clickContinueButton();
  }
}