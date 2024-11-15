import { expect, Page,Locator } from "@playwright/test";
export default class CheckEligibilityPage{

    readonly lbl_eligibilityPageBanner:Locator;
    readonly lbl_mandetoryField:Locator;
    readonly radio_IsSinagporian:Locator;
    readonly radio_groupSsalesTurnoverIsLessThan100:Locator;
    readonly radio_react_eligibility_global_hq_check:Locator;
    readonly radio_react_eligibility_new_target_market_check:Locator;
    readonly radio_react_eligibility_started_project_check:Locator;
    readonly btn_save:Locator;
    readonly lbl_toast:Locator;
    readonly btn_next:Locator;
    readonly ele_sidemenuElements:Locator;
    readonly lbl_Question:Locator;
    readonly lbl_RadioValidationMessage:Locator;
    readonly lbl_FAQ:Locator;
    
    constructor(public page:Page){
        this.lbl_eligibilityPageBanner=page.locator("xpath=//div[@class='main']//h2")
        this.lbl_mandetoryField=page.locator(".text-semibold.success-helptext")
        this.radio_IsSinagporian=page.locator("//input[@name='react-eligibility-sg_registered_check']/following-sibling::span")
        this.radio_groupSsalesTurnoverIsLessThan100=page.locator("//input[@name='react-eligibility-turnover_check']/following-sibling::span")
        this.radio_react_eligibility_global_hq_check=page.locator("//input[@name='react-eligibility-global_hq_check']/following-sibling::span")
        this.radio_react_eligibility_new_target_market_check=page.locator("//input[@name='react-eligibility-new_target_market_check']/following-sibling::span")
        this.radio_react_eligibility_started_project_check=page.locator("//input[@name='react-eligibility-started_project_check']/following-sibling::span")
        this.btn_save=page.locator("xpath=//button[text()='Save']")
        this.lbl_toast=page.locator(".growl-title");
        this.btn_next=page.locator("//button[text()='Next']")
        this.ele_sidemenuElements=page.locator("xpath=//li/a")
        this.lbl_Question=page.locator(".form-group .control-label.bgp-label")
        this.lbl_RadioValidationMessage=page.locator(".field-warning-text span")
        this.lbl_FAQ=page.locator("//div[@class='field-warning-text']//a[text()='FAQ']")
        
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

    async selectNoForTheApplicationRadioButtons(val_message:string,){
        const validation_message=this.lbl_RadioValidationMessage
        
        const radio_Q1=this.radio_IsSinagporian
        await radio_Q1.last().scrollIntoViewIfNeeded();
        await radio_Q1.nth(3).click()
        await expect(validation_message.nth(0)).toHaveText(val_message)

        const radio_Q2=this.radio_groupSsalesTurnoverIsLessThan100
        await radio_Q2.nth(3).click()
        await expect(validation_message.nth(1)).toHaveText(val_message)

        const radio_Q3=this.radio_react_eligibility_global_hq_check
        await radio_Q3.nth(3).scrollIntoViewIfNeeded();
        await radio_Q3.nth(3).click()
        await expect(validation_message.nth(2)).toHaveText(val_message)

        const radio_Q4=this.radio_react_eligibility_new_target_market_check 
        await radio_Q4.nth(3).scrollIntoViewIfNeeded();
        await radio_Q4.nth(3).click()
        await expect(validation_message.nth(3)).toHaveText(val_message)

        const radio_Q5=this.radio_react_eligibility_started_project_check
        await radio_Q5.nth(3).scrollIntoViewIfNeeded();
        await radio_Q5.nth(3).click()
        await expect(validation_message.nth(4)).toHaveText(val_message)
    }

    async saveEligibilityConfig(){
        const saveButton_el=this.btn_save
        await saveButton_el.click()
        await this.page.waitForLoadState("networkidle",{timeout:50000})
    }

    async verifyToastMessage(txt:string){
        await this.page.waitForSelector(".growl-title",{ state: 'visible' })
        const toastTxt=this.lbl_toast
        expect(toastTxt).toHaveText(txt)
        console.log("-------------Verify success toast message on save.-------------")
    }
    async reloadExistingPage(){
        await this.page.reload({
            timeout: 600000, 
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

    async navigatToFAQViaValMessage(){
        const faq=this.lbl_FAQ;
        await faq.first().click()
    }

   


}
