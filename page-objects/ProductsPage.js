import { expect  } from "@playwright/test";
import { Navigation_nav } from "./navigation";
import { isDesktopViewport} from "../utils/isDesktopViewPort.js";


export class ProductsPage {
    constructor(page) {
        this.page = page;

        this.addButton = page.locator('[data-qa="product-button"]') ;
        this.sortDropDown = page.locator('[data-qa="sort-dropdown"]');
        this.productTitle = page.locator('[data-qa="product-title"]');
    }

    visit = async () => {
        await this.page.goto("/");
    }

        addProductToBasket = async (index) => {
        const specificAddButton = this.addButton.nth(index); 
        await specificAddButton.waitFor();
        await expect (specificAddButton).toHaveText("Add to Basket");

        const navigation = new Navigation_nav(this.page);
        //only desktop viewport
        let basketCountBeforeAdding;
        if(isDesktopViewport(this.page)){
             basketCountBeforeAdding = await navigation.getBasketCount();
        }
        
        await specificAddButton.click();
        await expect (specificAddButton).toHaveText("Remove from Basket");
        // only desktop view
        if(isDesktopViewport(this.page)){
            const basketCountAfterAdding = await navigation.getBasketCount();
        expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);

        }
        
    }
    sortByCheapest = async () => {
        await this.sortDropDown.waitFor();
        await this.productTitle.first().waitFor();
        const productTitleBeforeSorting = await this.productTitle.allInnerTexts();
        await this.sortDropDown.selectOption('price-asc');
        const productTitleAfterSorting = await this.productTitle.allInnerTexts();
        expect(productTitleAfterSorting).not.toEqual(productTitleBeforeSorting);
        
    }
}