import { Page, Locator, expect } from '@playwright/test';

export class basePage {
    readonly page: Page;
    readonly headerText: Locator;
    readonly continueButton: Locator;
    readonly thereIsAProblemText: Locator;
    readonly errorSummaryList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerText = page.locator('h1');
        this.continueButton = page.locator("input[value='Continue'], button:has-text('Continue')");
        this.thereIsAProblemText = page.locator('#error-summary-title');
        this.errorSummaryList = page.locator('.govuk-error-summary__list');
    }

    async assertPageTitle(page: Page, title: string) {
        await expect(page).toHaveTitle(title);
    }

    async click(locator: Locator) {
        await locator.click();
    }

    async type(locator: Locator, text: string) {
        await locator.fill(text);
        await this.page.keyboard.press('Tab');
    }

    async clickContinueButton() {
        await this.click(this.continueButton);
    }

    async selectYesOrNoRadioOption(option: string) {
        await this.page.getByRole('radio', { name: option, exact: true }).check();
    }

    async selectCheckboxOptionWithText(optionText: string) {
        await this.page.getByRole('checkbox', { name: optionText }).check();
    }

    convertTextToDate(dateValue: string | null): string | null {
        if (dateValue == null) return null;

        const date = dateValue.trim().toLowerCase();
        if (!date) return dateValue;

        const now = new Date();

        const formatDate = (value: Date): string => {
            const day = String(value.getDate()).padStart(2, '0');
            const month = String(value.getMonth() + 1).padStart(2, '0');
            const year = value.getFullYear();

            return `${day}/${month}/${year}`;
        };

        const addDays = (value: Date, days: number) => {
            const newDate = new Date(value);
            newDate.setDate(newDate.getDate() + days);
            return newDate;
        };

        const addYears = (value: Date, years: number) => {
            const newDate = new Date(value);
            newDate.setFullYear(newDate.getFullYear() + years);
            return newDate;
        };

        const dateMappings: Record<string, () => Date> = {
            "today's date": () => now,
            "tomorrow's date": () => addDays(now, 1),
            "yesterday's date": () => addDays(now, -1),
            'less than 18 years ago': () => addDays(addYears(now, -18), 1),
            'more than 120 years ago': () => addDays(addYears(now, -120), -1),
        };

        const dateFn = dateMappings[date];

        return dateFn ? formatDate(dateFn()) : dateValue;
    }

    async enterDateOrDob(inputDate: string | null) {
        if (!inputDate?.trim()) return;

        const formattedDate = this.convertTextToDate(inputDate);

        if (!formattedDate) return;

        const dateParts = formattedDate.split('/');

        if (dateParts.length !== 3) {
            throw new Error('Invalid date format. Expected format: dd/mm/yyyy');
        }

        const [dayVal, monthVal, yearVal] = dateParts;

        await this.type(this.page.getByLabel('Day'), dayVal);
        await this.type(this.page.getByLabel('Month'), monthVal);
        await this.type(this.page.getByLabel('Year'), yearVal);
    }

    async linkTextIsDisplayed(linkText: string): Promise<boolean> {
        return this.page.getByRole('link', { name: linkText }).isVisible();
    }

    async getUrlForLinkText(linkText: string): Promise<string | null> {
        return this.page.getByRole('link', { name: linkText }).getAttribute('href');
    }

    async getThereIsAProblemTextErrorText(): Promise<string | null> {
        return this.thereIsAProblemText.textContent();
    }

    async getErrorSummaryListText(): Promise<string | null> {
        return this.errorSummaryList.textContent();
    }
}