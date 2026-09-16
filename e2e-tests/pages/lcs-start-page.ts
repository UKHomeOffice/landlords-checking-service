import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';

export class lcsStartPage extends basePage {
  readonly startNowButton: Locator;
  readonly acceptCookieButton: Locator;
  readonly hideThisMessageButton: Locator;

  constructor(page: Page) {
    super(page);
    this.startNowButton = page.getByRole('button', { name: 'Start now' });
    this.acceptCookieButton = page.locator('#accept-cookies-button');
    this.hideThisMessageButton = page.locator('#hide-accept-cookie-banner');
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Request a Home Office right to rent check – Request a right to rent check – GOV.UK'
      : 'Request a Home Office right to rent check – Request a right to rent check – GOV.UK';
  }

  async openLcs() {
    await this.page.goto('/');
    await this.acceptCookies();
  }

  async acceptCookies() {
    if (await this.acceptCookieButton.isVisible()) {
      await this.click(this.acceptCookieButton);
    }

    if (await this.hideThisMessageButton.isVisible()) {
      await this.click(this.hideThisMessageButton);
    }
  }

  async clickStartNow() {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.click(this.startNowButton);
  }

  async clickCheckingGuideLink() {
    await this.click(this.page.getByRole('link', { name: 'checking guide' }));
  }

  async clickRelevantDocumentsLink() {
    await this.click(this.page.getByRole('link', { name: 'Ask to see relevant documents' }));
  }
}