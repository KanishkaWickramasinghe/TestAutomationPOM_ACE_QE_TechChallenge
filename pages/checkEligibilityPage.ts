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
    readonly lbl_Question:Locator;


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
        this.lbl_Question=page.locator(".form-group .control-label.bgp-label")
    }
    

    async verifyCheckEligibilityPageBanner(lable:string){
        await this.page.waitForSelector("xpath=//div[@class='main']//h2", { state: 'visible' });
        const lbl_banner=this.lbl_eligibilityPageBanner
        expect(lbl_banner).toHaveText(lable)
        console.log("-------------Check eligibility page loaded successfully.-------------")
    }

    async verifyMandetoryFieldLabel(label:string){
        const lbl_banner=this.lbl_mandetoryField
        expect(lbl_banner).toHaveText(label)
        console.log("-------------Mandetory field label loaded.-------------")
    }

    async selectYesTo_IsSinagporian(){
        const isSgYes=this.radio_IsSinagporian
        await isSgYes.nth(0).click()
        console.log("-------------Is singaporian radio button selected-YES.-------------")
    }

    async selectYesTo_groupSsalesTurnoverIsLessThan100(){
        const radio=this.radio_groupSsalesTurnoverIsLessThan100
        await radio.nth(0).click()
        console.log("-------------Group sales turnover <100 radio button selected-YES.-------------")
    }

    async selectYesTo_react_eligibility_global_hq_check(){
        const radio=this.radio_react_eligibility_global_hq_check
        await radio.nth(0).scrollIntoViewIfNeeded();
        await radio.nth(0).click()
        console.log("-------------Eligibility of global HQ radio button selected-YES.-------------")
    }

    async selectYesTo_react_eligibility_new_target_market_check(){
        const radio=this.radio_react_eligibility_new_target_market_check 
        await radio.nth(0).scrollIntoViewIfNeeded();
        await radio.nth(0).click()
        console.log("-------------Eligibility new target market radio button selected-YES.-------------")
    }

    async selectYesTo_react_eligibility_started_project_check(){
        const radio=this.radio_react_eligibility_started_project_check
        await radio.nth(0).scrollIntoViewIfNeeded();
        await radio.nth(0).click()
        console.log("-------------Eligibility started project radio button selected-YES.-------------")
    }

    async saveFormEligibilitySectionAsDraft(){
        const btn_save=this.btn_saveFormEligibilitySectionAsDraft 
        await btn_save.click()
        console.log("-------------Saved eligibility config.-------------")
    }

    async verifyToastMessage(txt:string){
        await this.page.waitForSelector(".growl-title",{ state: 'visible' })
        const toastTxt=this.lbl_toast
        expect(toastTxt).toHaveText(txt)
        console.log("-------------Verify success toast message on save.-------------")
    }
    async reloadExistingPage(){
        await this.page.reload({
            timeout: 100000, 
            waitUntil: 'networkidle', 
          });
          console.log("-------------Page reloaded.-------------")
    }
    async verifySaveFunctionality(){
        const isSG=this.radio_IsSinagporian.first()
        const lessthan100=this.radio_groupSsalesTurnoverIsLessThan100.first()
        const globalHQ=this.radio_react_eligibility_global_hq_check.first()
        const targetMarcket=this.radio_react_eligibility_new_target_market_check.first()
        const started_project_check=this.radio_react_eligibility_started_project_check.first()
        

        await expect(isSG).toBeChecked()
            console.log("-------------Is Singaporian yes radio button select verified.-------------")
        await expect(globalHQ).toBeChecked()
            console.log("-------------Globale HQ radio button select verified.-------------")
        await expect(lessthan100).toBeChecked()
            console.log("-------------Turnover <100 radio button select verified.-------------")
        await expect(targetMarcket).toBeChecked()
            console.log("-------------Targetted radio button select verified.-------------")
        await expect(started_project_check).toBeChecked()
            console.log("-------------Project started radio button select verified.-------------")
    }

    async navigetToNextFormSection(){
        await this.btn_next.click()
        console.log("-------------Verify next section of form.-------------")
    }

    async verifyApplicationSectionCount(value:number){
        const elements=this.ele_sidemenuElements
        const count=await elements.count()
        console.log(count)
        expect(count).toEqual(value)
        console.log("-------------Vailable elements "+value+"-------------")
    }

    async verifyDisplayed_Q1(lbl_question1:string){
        const question1=this.lbl_Question.nth(0)
        expect(question1).toHaveText(lbl_question1)
        console.log("-------------Eligibility Question 1 verified.-------------")
    }
    async verifyDisplayed_Q2(lbl_question:string){
        const question1=this.lbl_Question.nth(1)
        expect(question1).toHaveText(lbl_question)
        console.log("-------------Eligibility Question 2 verified.-------------")
    }
    async verifyDisplayed_Q3(lbl_question:string){
        const question1=this.lbl_Question.nth(2)
        expect(question1).toHaveText(lbl_question)
        console.log("-------------Eligibility Question 3 verified.-------------")
    }
    async verifyDisplayed_Q4(lbl_question:string){
        const question1=this.lbl_Question.nth(3)
        expect(question1).toHaveText(lbl_question)
        console.log("-------------Eligibility Question 4 verified.-------------")
    }
    async verifyDisplayed_Q5(lbl_question:string){
        const question1=this.lbl_Question.nth(4)
        expect(question1).toHaveText(lbl_question)
        console.log("-------------Eligibility Question 5 verified.-------------")
    }

   


}
