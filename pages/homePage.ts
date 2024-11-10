import { expect, Locator, Page } from "@playwright/test";
export default class HomePage{
    readonly lbl_homeBanner:Locator;
    readonly btn_newGrants:Locator;
    readonly btn_logout:Locator;
    readonly lbl_loggedInUserName:Locator;
    readonly lbl_loggedInUserRole:Locator;

    constructor(public page:Page){
        this.lbl_homeBanner=page.locator(".dashboard-container h2")
        this.btn_newGrants=page.locator("#dashboard-menubox-app-apply-grant .dashboard-action-text-wrapper")
        this.btn_logout=page.locator("//span[text()='LOG OUT']")
        this.lbl_loggedInUserName=page.locator("#user-info-item .username-tag div")
        this.lbl_loggedInUserRole=page.locator("//div[@id='user-info-item']//span/a")
    }

    async verifyHomePageBanner(banner:string){

        const homeBanner= await this.lbl_homeBanner
        await homeBanner.waitFor({ state: 'visible',timeout: 600000  })
        expect(homeBanner).toHaveText(banner)
    }

    async navigateToNewGrants(){
        await this.btn_newGrants.click()
    }

    async logoutFromLoginUser(){
        const logoutButton=this.btn_logout
        expect(logoutButton).toBeVisible()
        await logoutButton.click()

    }

    async verifyLoggedInUser(name:string){
        const loggedInUserName=this.lbl_loggedInUserName
        loggedInUserName.waitFor({state:"visible",timeout:500000})
        await expect(loggedInUserName).toHaveText(name)
    }

    async verifyLoggedInUserRole(role:string){
        const loggedInUserRole=this.lbl_loggedInUserRole
        loggedInUserRole.waitFor({state:"visible",timeout:500000})
        await expect(loggedInUserRole).toHaveText(role)
    }
}

