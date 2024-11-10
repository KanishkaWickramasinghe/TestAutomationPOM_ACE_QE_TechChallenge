import { expect, Locator, Page } from "@playwright/test";
export default class HomePage{
    readonly lbl_homeBanner:Locator;
    readonly btn_newGrants:Locator;

    constructor(public page:Page){
        this.lbl_homeBanner=page.locator(".dashboard-container h2")
        this.btn_newGrants=page.locator("#dashboard-menubox-app-apply-grant .dashboard-action-text-wrapper")
    }

    async verifyHomePageBanner(banner:string){

        const homeBanner= await this.lbl_homeBanner
        await homeBanner.waitFor({ state: 'visible',timeout: 600000  })
        expect(homeBanner).toHaveText(banner)
    }

    async navigateToNewGrants(){
        await this.btn_newGrants.click()
    }
}

