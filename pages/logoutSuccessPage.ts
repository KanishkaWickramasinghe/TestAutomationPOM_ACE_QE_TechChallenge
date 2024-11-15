import { expect, Locator, Page } from "@playwright/test";

export default class LogoutSuccessPage{
    readonly lbl_logoutSuccessBanner:Locator;
    readonly btn_login:Locator;

    constructor(public page:Page){
        this.lbl_logoutSuccessBanner=page.locator("xpath=//h4")
        this.btn_login=page.locator("#login-button")
    }

    async verifyDisplayOfSuccessfulLogout(label:string){
        const logoutBanner=this.lbl_logoutSuccessBanner
        const logoutButton=this.btn_login
        logoutBanner.nth(1).waitFor({state:"visible",timeout:500000})
        expect(logoutBanner.nth(1)).toHaveText(label)
        expect(logoutButton).toBeVisible()
        console.log("-------------User is successfully loggedout.-------------")
    }
} 