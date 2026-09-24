import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class lcsHasTheTenantBeenInTheUkBefore1988Page extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Has the Tenant been in the UK since before 1988? – Request a right to rent check – GOV.UK'
      : 'Has the Tenant been in the UK since before 1988? – Request a right to rent check – GOV.UK';
  }

  async completeHasTheTenantBeenInUkBefore1988Page(option: string) {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.selectYesOrNoRadioOption(option);
    await this.clickContinueButton();
  }
}