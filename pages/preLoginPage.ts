import { expect, Locator, Page } from "@playwright/test";

export default class PreLoginPage{

    readonly lbl_PageBanner:Locator;
    readonly btn_Login:Locator;


    constructor(public page:Page){
        this.lbl_PageBanner=page.locator("#mainnav-1 [alt='Frequently asked questions']")
        this.btn_Login=page.locator("#js-app #login-button")
    }

    async verifyPreLoginPageHeader(title:string){
        const pageTitle=await this.lbl_PageBanner
        await expect(pageTitle).toHaveText(title)
    }

    async loginToBGP(){
        await this.btn_Login
        .click();
    }
}