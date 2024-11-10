import { expect, Locator, Page } from "@playwright/test";
export default class NewGrantsPage{

    readonly lbl_newGrants:Locator;
    readonly lbl_granType:Locator;
    readonly lbl_grantPageNavigationHeader:Locator;
    readonly btn_OverSeas:Locator;
    readonly btn_marketReadinessAssistance:Locator;
    readonly btn_applyForGrantAfterConfig:Locator;



    constructor(public page:Page){
        this.lbl_newGrants=page.locator("#grant-wizard h3")
        this.lbl_granType=page.locator("xpath=//input[@name='industry_type']/following-sibling::div/div[text()='IT']")
        this.lbl_grantPageNavigationHeader=page.locator("#grant-wizard h3")
        this.btn_OverSeas=page.locator("xpath=//input[@id='International Expansion']")
        this.btn_marketReadinessAssistance=page.locator("xpath=//div[text()='Market Readiness Assistance']/ancestor::label/input")
        this.btn_applyForGrantAfterConfig=page.locator("xpath=//button[text()='Apply']")

    }

    async verifyNewGrantsBanner(banner:string){
        const pageBanner= this.lbl_newGrants
        await expect(pageBanner).toBeVisible({ timeout: 45000 });
        expect(pageBanner).toHaveText(banner)
    }

    async pickGrantTypeByText_IT(){
        const grantTypeIT=this.lbl_granType
        await grantTypeIT.click()

    }
    async verifySelectedGrantPageNavigation(text:string){
        const elementText= this.lbl_grantPageNavigationHeader
        expect(elementText).toHaveText(text)
    }

    async selectBringMyBusinessOverSeas(){
        const btn_intExp=this.btn_OverSeas
        await expect(btn_intExp).toBeVisible({timeout:15000})
        await btn_intExp.click()
    }

    async marketReadinessAssistance(){
        const btn_Readiness=this.btn_marketReadinessAssistance
        await expect(btn_Readiness).toBeVisible({timeout:600000})
        await btn_Readiness.click()
    }
    async applyForGrantAfterConfig(){
        const btn_apply=this.btn_applyForGrantAfterConfig
        await expect(btn_apply).toBeVisible({timeout:1000000})
        await btn_apply.click({ timeout: 15000 })
    }
    
}