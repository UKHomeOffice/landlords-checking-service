import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class lcsDoesThePersonAlreadyLiveInYourPropertyPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Does the person already live in your property? – Request a right to rent check – GOV.UK'
      : 'Does the person already live in your property? – Request a right to rent check – GOV.UK';
  }

  async completeDoesThePersonAlreadyLiveInYourPropertyPage(option: string, dateValue: string) {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.selectYesOrNoRadioOption(option);

    if (option.toLowerCase() === 'yes') {
      await this.enterDateOrDob(dateValue);
    }

    await this.clickContinueButton();
  }
}