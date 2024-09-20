import { expect } from "@playwright/test";

export class Checkout {
    constructor(page){
        this.page = page
        this.basketCards = page.locator('[data-qa="basket-card"]');
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
        this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]');
        this.continuetoCheckoutButton = page.locator('[data-qa="continue-to-checkout"]')

    }
    
    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor();
        const itemsBeforeRemoval = await this.basketCards.count();
        await this.basketItemPrice.first().waitFor();
        const allPriceTexts = await this.basketItemPrice.allInnerTexts();
        const justNumbers = allPriceTexts.map((element) => {
            const withoutDolloarSign = element.replace("$", "");
            return parseInt(withoutDolloarSign, 10);

        })
        const smallestPrice = Math.min(...justNumbers);
        const smallestPriceIdx = justNumbers.indexOf(smallestPrice);
        const specificRemoveButton = this.basketItemRemoveButton.nth(smallestPriceIdx);
        await specificRemoveButton.waitFor();
        await specificRemoveButton.click();

        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval -1);

    }
    continueToCheckout = async () =>{
        await this.continuetoCheckoutButton.waitFor();
        await this.continuetoCheckoutButton.click();
        await this.page.waitForURL(/\/login/, {timeout: 3000});

    }
    
}