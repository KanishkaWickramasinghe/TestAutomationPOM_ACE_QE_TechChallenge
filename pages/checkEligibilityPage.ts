import { expect, Page,Locator } from "@playwright/test";
export default class CheckEligibilityPage{

    readonly lbl_eligibilityPageBanner:Locator;
    readonly lbl_mandetoryField:Locator;
    readonly radio_IsSinagporian:Locator;
    readonly radio_groupSsalesTurnoverIsLessThan100:Locator;
    readonly radio_react_eligibility_global_hq_check:Locator;
    readonly radio_react_eligibility_new_target_market_check:Locator;
    readonly radio_react_eligibility_started_project_check:Locator;
    readonly btn_saveFormEligibilitySectionAsDraft:Locator;
    readonly lbl_toast:Locator;
    readonly btn_next:Locator;
    readonly ele_sidemenuElements:Locator;
    readonly lbl_Q1:Locator;
    readonly lbl_Q2:Locator;
    readonly lbl_Q3:Locator;
    readonly lbl_Q4:Locator;
    readonly lbl_Q5:Locator;




    constructor(public page:Page){
        this.lbl_eligibilityPageBanner=page.locator("xpath=//div[@class='main']//h2")
        this.lbl_mandetoryField=page.locator(".text-semibold.success-helptext")
        this.radio_IsSinagporian=page.locator("//input[@id='react-eligibility-sg_registered_check-true']/following-sibling::span")
        this.radio_groupSsalesTurnoverIsLessThan100=page.locator("//input[@id='react-eligibility-turnover_check-true']/following-sibling::span")
        this.radio_react_eligibility_global_hq_check=page.locator("//input[@id='react-eligibility-global_hq_check-true']/following-sibling::span")
        this.radio_react_eligibility_new_target_market_check=page.locator("//input[@id='react-eligibility-new_target_market_check-true']/following-sibling::span")
        this.radio_react_eligibility_started_project_check=page.locator("//input[@id='react-eligibility-started_project_check-true']/following-sibling::span")
        this.btn_saveFormEligibilitySectionAsDraft=page.locator("xpath=//button[text()='Save']")
        this.lbl_toast=page.locator(".growl-title");
        this.btn_next=page.locator("//button[text()='Next']")
        this.ele_sidemenuElements=page.locator("xpath=//li/a")
        this.lbl_Q1=page.locator(".form-group .control-label.bgp-label").nth(0)
        this.lbl_Q2=page.locator(".form-group .control-label.bgp-label").nth(1)
        this.lbl_Q3=page.locator(".form-group .control-label.bgp-label").nth(2)
        this.lbl_Q4=page.locator(".form-group .control-label.bgp-label").nth(3)
        this.lbl_Q5=page.locator(".form-group .control-label.bgp-label").nth(4)


    }
    

    async verifyCheckEligibilityPageBanner(lable:string){
        await this.page.waitForSelector("xpath=//div[@class='main']//h2", { state: 'visible' });
        const lbl_banner=this.lbl_eligibilityPageBanner
        expect(lbl_banner).toHaveText(lable)
    }

    async verifyMandetoryFieldLabel(label:string){
        const lbl_banner=this.lbl_mandetoryField
        expect(lbl_banner).toHaveText(label)
    }

    async selectYesTo_IsSinagporian(){
        const isSgYes=this.radio_IsSinagporian
        await isSgYes.nth(0).click()
    }

    async selectYesTo_groupSsalesTurnoverIsLessThan100(){
        const radio=this.radio_groupSsalesTurnoverIsLessThan100
        await radio.nth(0).click()
    }

    async selectYesTo_react_eligibility_global_hq_check(){
        const radio=this.radio_react_eligibility_global_hq_check
        await radio.nth(0).scrollIntoViewIfNeeded();
        await radio.nth(0).click()
    }

    async selectYesTo_react_eligibility_new_target_market_check(){
        const radio=this.radio_react_eligibility_new_target_market_check 
        await radio.nth(0).scrollIntoViewIfNeeded();
        await radio.nth(0).click()
    }

    async selectYesTo_react_eligibility_started_project_check(){
        const radio=this.radio_react_eligibility_started_project_check
        await radio.nth(0).scrollIntoViewIfNeeded();
        await radio.nth(0).click()
    }

    async saveFormEligibilitySectionAsDraft(){
        const btn_save=this.btn_saveFormEligibilitySectionAsDraft 
        await btn_save.click()
    }

    async verifyToastMessage(txt:string){
        await this.page.waitForSelector(".growl-title",{ state: 'visible' })
        const toastTxt=this.lbl_toast
        expect(toastTxt).toHaveText(txt)
    }
    async reloadExistingPage(){
        await this.page.reload({
            timeout: 100000, 
            waitUntil: 'networkidle', 
          });
    }
    async verifySaveFunctionality(){
        const isSG=this.radio_IsSinagporian.first()
        const lessthan100=this.radio_groupSsalesTurnoverIsLessThan100.first()
        const globalHQ=this.radio_react_eligibility_global_hq_check.first()
        const targetMarcket=this.radio_react_eligibility_new_target_market_check.first()
        const started_project_check=this.radio_react_eligibility_started_project_check.first()
        

        await expect(isSG).toBeChecked()
        await expect(globalHQ).toBeChecked()
        await expect(lessthan100).toBeChecked()
        await expect(targetMarcket).toBeChecked()
        await expect(started_project_check).toBeChecked()
    }

    async navigetToNextFormSection(){
        await this.btn_next.click()
    }

    async verifyApplicationSectionCount(value:number){
        const elements=this.ele_sidemenuElements
        const count=await elements.count()
        console.log(count)
        expect(count).toEqual(value)
    }

    async verifyDisplayed_Q1(lbl_question1:string){
        const question1=this.lbl_Q1
        expect(question1).toHaveText(lbl_question1)
    }
    async verifyDisplayed_Q2(lbl_question:string){
        const question1=this.lbl_Q2
        expect(question1).toHaveText(lbl_question)
    }
    async verifyDisplayed_Q3(lbl_question:string){
        const question1=this.lbl_Q3
        expect(question1).toHaveText(lbl_question)
    }
    async verifyDisplayed_Q4(lbl_question:string){
        const question1=this.lbl_Q4
        expect(question1).toHaveText(lbl_question)
    }
    async verifyDisplayed_Q5(lbl_question:string){
        const question1=this.lbl_Q5
        expect(question1).toHaveText(lbl_question)
    }

   


}
