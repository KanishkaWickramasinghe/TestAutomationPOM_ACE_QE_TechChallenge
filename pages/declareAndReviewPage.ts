import { expect, Locator, Page } from "@playwright/test";

export default class DeclareAndReviewPage{
    readonly lbl_banner:Locator;
    readonly btn_review:Locator;
    readonly lbl_errorLabel:Locator;
    readonly radio_criminalLiabilityCheck:Locator;
    readonly radio_civil_proceeding_check:Locator;
    readonly radio_insolvency_proceeding_check:Locator;
    readonly radio_incentives_check:Locator;
    readonly radio_other_incentives_check:Locator;
    readonly radio_project_commence_check:Locator;
    readonly radio_realated_party:Locator;
    readonly radio_debarment_check:Locator;
    readonly checkbox_ack:Locator;

    constructor(public page:Page){
        this.lbl_banner=page.locator(".main h2")
        this.btn_review=page.locator("//button[text()='Review']")
        this.lbl_errorLabel=page.locator(".label.label-error")
        this.radio_criminalLiabilityCheck=page.locator("//input[@name='react-declaration-criminal_liability_check']/following-sibling::span[@class='bgp-label']")
        this.radio_civil_proceeding_check=page.locator("//input[@name='react-declaration-civil_proceeding_check']/following-sibling::span[@class='bgp-label']")
        this.radio_insolvency_proceeding_check=page.locator("//input[@name='react-declaration-insolvency_proceeding_check']/following-sibling::span[@class='bgp-label']")
        this.radio_incentives_check=page.locator("//input[@name='react-declaration-project_incentives_check']/following-sibling::span[@class='bgp-label']")
        this.radio_other_incentives_check=page.locator("//input[@name='react-declaration-other_incentives_check']/following-sibling::span[@class='bgp-label']")
        this.radio_project_commence_check=page.locator("//input[@name='react-declaration-project_commence_check']/following-sibling::span[@class='bgp-label']")
        this.radio_realated_party=page.locator("//input[@name='react-declaration-related_party_check']/following-sibling::span[@class='bgp-label']")
        this.radio_debarment_check=page.locator("//input[@name='react-declaration-debarment_check']/following-sibling::span[@class='bgp-label']")
        this.checkbox_ack=page.locator("#react-declaration-consent_acknowledgement_check")

    }

    async verifyPageBannerInBusinessImpact(bannerTxt:string){
        const banner=this.lbl_banner;
        await this.page.waitForTimeout(5000)
        await expect(banner).toHaveText(bannerTxt)
        console.log("-----------Review page banner verified.---------------")
    }

    async reviewDetails(){
        const reviewButton=this.btn_review
        await reviewButton.scrollIntoViewIfNeeded()
        await reviewButton.click()
        await this.page.waitForTimeout(5000)
        console.log("----------Review input details clicking on review button-----------")
    }

    async verifyErrorMessageLabelDisplay(){
        const errorLable=this.lbl_errorLabel;
        await errorLable.waitFor({state:"visible",timeout:50000})
        await errorLable.scrollIntoViewIfNeeded()
        await expect(errorLable.first()).toBeVisible()
    }

    async selectCriminal_liability_check(){
        const radio=this.radio_criminalLiabilityCheck
        await radio.first().scrollIntoViewIfNeeded()
        await radio.first().click()
        console.log("----------Select criminal liability Check-----------")
    }

    async selectCivilProceedings_check(){
        const radio=this.radio_civil_proceeding_check
        await radio.first().click()
        console.log("----------Select civil proceedings Check-----------")
    }

    async selectinsolvency_check(){
        const radio=this.radio_insolvency_proceeding_check
        await radio.first().click()
        console.log("----------Select insolvency_proceeding_check-----------")
    }
    async selectProject_incentives_check(){
        const radio=this.radio_incentives_check
        await radio.first().click()
        console.log("----------Select incentives_check-----------")
    }
    async selectOther_incentives_check(){
        const radio=this.radio_other_incentives_check
        await radio.first().scrollIntoViewIfNeeded()
        await radio.first().click()
        console.log("----------Select other_incentives_check-----------")
    }

    async selectProjectCommence_check(){
        const radio=this.radio_project_commence_check
        await radio.first().click()
        console.log("----------Select project commence_check-----------")
    }

    async selectdebarment_check(){
        const radio=this.radio_debarment_check
        await radio.first().click()
        console.log("----------Select debarment_check-----------")
    }
    async selectRelated_party_check(){
        const radio=this.radio_realated_party
        await radio.first().click()
        console.log("----------Select related_party_check-----------")
    }
    

    async selectApplicantAcknolwledgement(){
        const ack_checkbox=this.checkbox_ack
        await ack_checkbox.click()
    }

    


}