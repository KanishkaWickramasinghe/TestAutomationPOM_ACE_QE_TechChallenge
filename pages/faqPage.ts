import { expect, Locator, Page } from "@playwright/test";
import { url } from "inspector";
export default class FAQPage{
    readonly lbl_FaqPageBanner:Locator;  
    readonly lbl_loginPointBanner:Locator; 

    constructor(page:Page){
        this.lbl_FaqPageBanner=page.locator("xpath=//div[@class='content']/h3")
        this.lbl_loginPointBanner=page.locator("xpath=//h1[@class='has-text-white']/b")
    }

    async verifyFAQPageBanner(bannerText:string){
        const pageBanner=this.lbl_FaqPageBanner;
        await pageBanner.waitFor({state:"visible",timeout:500000})
        expect(pageBanner).toBeVisible()
        expect(pageBanner).toHaveText(bannerText)
        console.log("-------------FAQ page loaded.-------------")
    }

    async verifyUniqBannerFrolLoginPoint(bannr:string){
        const txtBanner=this.lbl_loginPointBanner;
        await txtBanner.waitFor({state:"visible",timeout:500000})
        await expect(txtBanner).toHaveText(bannr)
    }

    async verifyNavigatedURL(){
        const  currentUrl=url()
        console.log("-------Current url: "+currentUrl)
        await expect(currentUrl).toBe('https://www.gobusiness.gov.sg/business-grants-portal-faq/get-a-grant/');
    }
}