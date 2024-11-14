import { expect, Locator, Page } from "@playwright/test";

export default class CostPage{
    readonly lbl_banner:Locator;
    readonly btn_next:Locator;
    readonly btn_addNewItem:Locator;
    readonly radio_vendorRegistered:Locator;
    readonly input_vendorName:Locator;
    readonly input_supportingDoc:Locator;
    readonly input_billingCurrency:Locator;
    readonly btn_thirdpartyVendor:Locator;


    constructor(public page:Page){
        this.lbl_banner=page.locator(".main h2")
        this.btn_next=page.locator("//button[text()='Next']")
        this.btn_addNewItem=page.locator("//button[text()='Add New Item']")
        this.radio_vendorRegistered=page.locator("//span[text()='Overseas']")
        this.input_vendorName=page.locator("#react-project_cost-vendors-0-vendor_name")
        this.input_supportingDoc=page.locator("#react-project_cost-vendors-0-attachments-input")
        this.input_billingCurrency=page.locator("#react-project_cost-vendors-0-amount_in_billing_currency")
        this.btn_thirdpartyVendor=page.locator("//div[text()='Third Party Vendors']")

    }

    async verifyPageBannerInBusinessImpact(bannerTxt:string){
        const banner=this.lbl_banner;
        await expect(banner).toHaveText(bannerTxt)
        console.log("-----------Business impact page banner verified.---------------")
    }

    async navigateToNextPage(){
        const nextButton=this.btn_next
        await nextButton.click()
        console.log("----------Navigate to business impact page from proposal page-----------")
    }

    async addNewItem(){
        const btnNewItem=this.btn_addNewItem
        await btnNewItem.first().waitFor({state:"visible"})
        await btnNewItem.first().filter().click()
    }

    async selectFile(path:string){
        const filePath=this.input_supportingDoc
        await filePath.setInputFiles(path)
        await this.page.waitForLoadState("networkidle",{timeout:5000000})
        console.log("----------File attachment attached successfully in the  proposal page.-----------")
    }

    async expandThirdPartyVendorSection(){
        const btnThirdPartyVendor=this.btn_thirdpartyVendor
        await btnThirdPartyVendor.waitFor({state:"visible"})
        await btnThirdPartyVendor.click()
    }

    async venderRegistrationType(){
        const radio=this.radio_vendorRegistered
        await radio.click()
    }

    async setVendorName(name:string){
        const vendor=this.input_vendorName
        await vendor.fill(name)

    }

    async setEstimatedBillingCurrency(value:string){
        const cost=this.input_billingCurrency
        await cost.scrollIntoViewIfNeeded()
        await cost.fill(value)
    }







}
