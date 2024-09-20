export class LoginPage {
    constructor(page){
        this.page = page
        this.moveToSingupButton = page.locator('[data-qa="go-to-signup-button"]');
    }

    moveToSingup = async () => {
        await this.moveToSingupButton.waitFor();
        await this.moveToSingupButton.click();
        this.page.waitForURL(/\/signup/, {timeout: 3000});

    }
}