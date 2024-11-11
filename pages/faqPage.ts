import { expect, Locator, Page } from "@playwright/test";
export default class FAQPage{
    readonly lbl_FaqPageBanner:Locator;    
    constructor(page:Page){
        this.lbl_FaqPageBanner=page.locator("#business-grants-portal-faq")
    }

    async verifyFAQPageBanner(bannerText:string){
        const pageBanner=this.lbl_FaqPageBanner;
        expect(pageBanner).toBeVisible()
        expect(pageBanner).toHaveText(bannerText)
    }
}