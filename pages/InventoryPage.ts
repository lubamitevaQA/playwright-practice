import { Page, Locator } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;

  readonly filterDropdown: Locator;
  readonly shoppingCart: Locator;

  constructor(page: Page) {
    this.page = page;

    this.filterDropdown = page.locator('[data-test="product-sort-container"]');
    this.shoppingCart = page.locator('[data-test="shopping-cart-link"]');
  }

  async viewInventoryItem(productName: string): Promise<void> {
    const fullProductName = this.getFullProductName(productName);
    await this.page
      .locator(`[data-test="inventory-item-sauce-labs-${fullProductName}"]`)
      .click();
  }

  async addToCart(productName: string): Promise<void> {
    const fullProductName = this.getFullProductName(productName);
    await this.page
      .locator(`[data-test="add-to-cart-${fullProductName}"]`)
      .click();
  }

  async selectFilter(filterOption: string): Promise<void> {
    await this.filterDropdown.selectOption(filterOption);
  }

  async gotoCart(): Promise<void> {
    await this.shoppingCart.click();
  }

  private getFullProductName(productName: string): string {
    return productName.replaceAll(" ", "-");
  }
}
