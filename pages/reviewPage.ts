import { expect, Locator, Page } from "@playwright/test";
export default class ReviewPage{
    readonly pageHeader:Locator;
    readonly lbl_eligibility:Locator;
    readonly lbl_registered_check:Locator;
    readonly lbl_turnover_check:Locator;
    readonly lbl_global_hq_check:Locator;
    readonly lbl_target_market_check:Locator;
    readonly lbl_started_project_check:Locator;
    readonly lbl_contactName:Locator;
    readonly lbl_contactJobTitle:Locator;
    readonly lbl_ContactNo:Locator;
    readonly lbl_email:Locator;
    readonly lbl_altEmail:Locator;
    readonly lbl_ContactAddress:Locator;
    readonly offerAd_name:Locator;
    readonly offerAd_job:Locator;
    readonly offerAd_email:Locator;
    readonly checkBoc_truthfulnessCheck:Locator;
    readonly btn_submit:Locator;
    readonly lbl_Success:Locator;
    readonly lbl_rfid:Locator;
    readonly lbl_agency:Locator;
    readonly btn_myGrants:Locator;


    constructor(public page:Page){
        this.pageHeader=page.locator("#company h2")
        this.lbl_eligibility=page.locator("#eligibility h2")
        this.lbl_registered_check=page.locator("#react-eligibility-sg_registered_check")
        this.lbl_turnover_check=page.locator("#react-eligibility-turnover_check")
        this.lbl_global_hq_check=page.locator("#react-eligibility-global_hq_check")
        this.lbl_target_market_check=page.locator("#react-eligibility-new_target_market_check")
        this.lbl_started_project_check=page.locator("#react-eligibility-started_project_check")

        this.lbl_contactName=page.locator("#react-contact_info-name")
        this.lbl_contactJobTitle=page.locator("#react-contact_info-designation")
        this.lbl_ContactNo=page.locator("#react-contact_info-phone")
        this.lbl_email=page.locator("#react-contact_info-primary_email")
        this.lbl_altEmail=page.locator("#react-contact_info-secondary_email")
        this.lbl_ContactAddress=page.locator("#react-contact_info-correspondence_address")

        this.offerAd_name=page.locator("#react-contact_info-offeree_name")
        this.offerAd_job=page.locator("#react-contact_info-offeree_designation")
        this.offerAd_email=page.locator("#react-contact_info-offeree_email")

        this.checkBoc_truthfulnessCheck=page.locator("#react-declaration-info_truthfulness_check")
        this.btn_submit=page.locator("//button[text()='Submit']")

        this.lbl_Success=page.locator(".card h3")
        this.lbl_rfid=page.locator("//td[text()='Ref ID:']/following-sibling::td")
        this.lbl_agency=page.locator("//td[text()='Agency Details:']/following-sibling::td/span")
        this.btn_myGrants=page.locator("//a[text()='My Grants']")

    }

    async verifyLoadedPageBanner(banner:string){
        const bannerTxt=this.pageHeader
        await expect(bannerTxt).toHaveText(banner)
    }

    async verifyEligibilitySectionBanner(banner:string){
        const bannerTxt=this.lbl_eligibility
        await bannerTxt.scrollIntoViewIfNeeded()
        await expect(bannerTxt).toHaveText(banner)
    }

    async verifyRegistered_check(lbl:string){
        const label=this.lbl_registered_check
        await label.scrollIntoViewIfNeeded()
        await expect(label).toHaveText(lbl)
    }
    async verifyTurnover_check(lbl:string){
        const label=this.lbl_turnover_check
        await label.scrollIntoViewIfNeeded()
        await expect(label).toHaveText(lbl)
    }

    async verifyGlobal_hq_check(lbl:string){
        const label=this.lbl_global_hq_check
        await label.scrollIntoViewIfNeeded()
        await expect(label).toHaveText(lbl)
    }
    async verifyMarket_check(lbl:string){
        const label=this.lbl_target_market_check
        await label.scrollIntoViewIfNeeded()
        await expect(label).toHaveText(lbl)
    }
    async verifyProject_check(lbl:string){
        const label=this.lbl_started_project_check
        await label.scrollIntoViewIfNeeded()
        await expect(label).toHaveText(lbl)
    }

    async verifyContatPersonDetails(uname:string,ujob:string,ucontactNo:string,uemail:string,uAltEmailt:string){
        const name=this.lbl_contactName
        const job=this.lbl_contactJobTitle
        const contactNo=this.lbl_ContactNo
        const email=this.lbl_email
        const altEmail=this.lbl_altEmail
        

        await altEmail.scrollIntoViewIfNeeded()
        await expect(name).toHaveText(uname)
        await expect(job).toHaveText(ujob)
        await expect(contactNo).toHaveText(ucontactNo)
        await expect(email).toHaveText(uemail)
        await expect(altEmail).toHaveText(uAltEmailt)
    }
    async verifyLetterOfAddresse(uname:string,ujob:string,uemail:string){
        const name=this.offerAd_name
        const job=this.offerAd_job
        const email=this.offerAd_email

        await email.scrollIntoViewIfNeeded()
        await this.page.waitForLoadState("networkidle")
        await expect(name).toHaveText(uname)
        await expect(job).toHaveText(ujob)
        await expect(email).toHaveText(uemail)
    }
    async selectTruthfulnessCheck(){
        const checkbox=this.checkBoc_truthfulnessCheck
        await checkbox.scrollIntoViewIfNeeded()
        await expect(checkbox).toBeVisible()
        await checkbox.click()
    }

    async submitReviewedApplication(){
        const submitButton=this.btn_submit
        await submitButton.scrollIntoViewIfNeeded()
        await expect(submitButton).toBeEnabled()
        await submitButton.click()
    }

    async verifySuccessMessage(label:string){
        const successLabel=this.lbl_Success
        await expect(successLabel).toBeVisible
        await expect(successLabel).toHaveText(label)
    }

    async verifySuccessMessageDetails(label:string){
        const rfid=this.lbl_rfid
        const agency=this.lbl_agency
        await expect(rfid).toBeVisible()
        await expect(agency.first()).toHaveText(label)
    }

    async readRFIDValue(): Promise<string | null> {
        const rfid=await this.lbl_rfid.textContent()
        return rfid
    }

    async navigateToMyGrantsPage(){
        const mygrants=this.btn_myGrants
        await mygrants.scrollIntoViewIfNeeded()
        await mygrants.click()
        await this.page.waitForTimeout(800000)
    }

}