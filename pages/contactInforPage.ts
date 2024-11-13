import { expect, Page,Locator } from "@playwright/test";

export default class ContactInforPage{
    readonly lbl_contactDetailsBanner:Locator;
    readonly input_name:Locator;
    readonly input_jobTitle:Locator;
    readonly input_ContactInfor:Locator;
    readonly input_email:Locator;
    readonly input_altEmail:Locator;

    readonly btn_search:Locator;
    readonly input_PostalCode:Locator;
    readonly lbl_postalCodeValidation:Locator;
    readonly lbl_blockHouse:Locator;
    readonly lbl_streetName:Locator;

    readonly checkbox_sameAsRegisteredAddress:Locator;
    readonly lbl_offeree_name:Locator;
    readonly lbl_offeree_designation:Locator;
    readonly lbl_offeree_email:Locator;

    readonly checkbox_letterOfOfferAdressee:Locator;
    readonly btn_save:Locator;
    readonly btn_next:Locator;

    constructor(public page:Page){
        this.lbl_contactDetailsBanner=page.locator(".main h2")
        this.input_name=page.locator("xpath=//div[@class='bgp-questions-grp']//input[@id='react-contact_info-name']")
        this.input_jobTitle=page.locator("xpath=//div[@class='bgp-questions-grp']//input[@id='react-contact_info-designation']")
        this.input_ContactInfor=page.locator("xpath=//div[@class='bgp-questions-grp']//input[@id='react-contact_info-phone']")
        this.input_email=page.locator("xpath=//div[@class='bgp-questions-grp']//input[@id='react-contact_info-primary_email']")
        this.input_altEmail=page.locator("xpath=//div[@class='bgp-questions-grp']//input[@id='react-contact_info-secondary_email']")

        this.checkbox_sameAsRegisteredAddress=page.locator("#react-contact_info-correspondence_address-copied")
        this.input_PostalCode=page.locator("#react-contact_info-correspondence_address-postal")
        this.btn_search=page.locator("#react-contact_info-correspondence_address-postal-postal")
        this.lbl_postalCodeValidation=page.locator("#react-contact_info-correspondence_address-postal-alert")
        this.lbl_blockHouse=page.locator("#react-contact_info-correspondence_address-block")
        this.lbl_streetName=page.locator("#react-contact_info-correspondence_address-street")

        this.checkbox_letterOfOfferAdressee=page.locator("xpath=//span[text()='Same as main contact person']")
        this.lbl_offeree_name=page.locator("#react-contact_info-offeree_name"),
        this.lbl_offeree_designation=page.locator("#react-contact_info-offeree_designation"),
        this.lbl_offeree_email=page.locator("#react-contact_info-offeree_email")
        this.btn_save=page.locator("xpath=//button[text()='Save']")
        this.btn_next=page.locator("xpath=//button[text()='Next']")
    }

    async verifyPageBanner(banner:string){
        const banner_text=this.lbl_contactDetailsBanner
        await this.page.waitForLoadState("networkidle")
        expect(banner_text).toHaveText(banner)
        console.log("------------Contact infor page banner verified-----------")
    }

    async verifyDisplayOfMainContactPersonInputFields(){
        await this.page.waitForTimeout(2000);
        const name=this.input_name
        const jobTitle=this.input_jobTitle
        const contactNo=this.input_ContactInfor
        const email=this.input_email
        const altEmail=this.input_altEmail

        await expect(name).toBeVisible({timeout:500000})
        await expect(jobTitle).toBeVisible({timeout:500000})
        await expect(contactNo).toBeVisible({timeout:500000})
        await expect(email).toBeVisible({timeout:500000})
        await expect(altEmail).toBeVisible({timeout:500000})
        console.log("------------Name,Job title, contact no, email, alt-email sections displayed once page loaded.-----------")  
    }

    async addMainContactName(uName:string){
        const name=this.input_name
        await name.type(uName)
        console.log("------------Add name-----------")
    }
    async addMainJobTitle(uJob:string){
        const jobTitle=this.input_jobTitle
        await jobTitle.type(uJob)
        console.log("------------Add job title-----------")
    }
    async addMainContactNumber(ucontactNo:string){
        const contactNo=this.input_ContactInfor
        await contactNo.type(ucontactNo)
        console.log("------------Add contact number-----------")  
    }
    
    

    async addEmailAddressDetails(uemail:string,uAltEmail:string){
        const email=this.input_email
        const altEmail=this.input_altEmail
        await email.fill(uemail)
        console.log("------------Add email address-----------")
        await altEmail.fill(uAltEmail)
        console.log("------------Add alt email address-----------")

    }

    async filterforInvalidPostalCode(postalCode:string){
        const po_code=this.input_PostalCode
        await po_code.scrollIntoViewIfNeeded()
        await po_code.clear()
        console.log("------------Existing postal code cleared.-----------")  
        await po_code.fill(postalCode)
        console.log("------------New postal code added.-----------")  
        await this.btn_search.click()
        console.log("------------Postal code filtered-----------")  
        
    }

    async verifyPostalCodeValidationMessage(message:string){
        const val_message=this.lbl_postalCodeValidation
        await expect(val_message).toBeVisible()
        await expect(val_message).toHaveText(message)
        console.log("------------Postal code validation message displayed.-----------")  
    }

    async addMailingAddressManually(postalCode:string,blkNo:string,streetName:string){
        const po_code=this.input_PostalCode
        const blkHse=this.lbl_blockHouse
        const street=this.lbl_streetName

        await po_code.scrollIntoViewIfNeeded()
        await po_code.clear()
        await po_code.fill(postalCode)
        await this.btn_search.click()
        console.log("------------search for postal code-----------")

        await expect(blkHse).toHaveValue(blkNo)
        console.log("------------Block house number populated-----------")
        await expect(street).toHaveValue(streetName)
        console.log("------------Street name populated-----------")
    }

    async checkSameAsMainMontactPerson(){
        const sameAsContactPerson=this.checkbox_letterOfOfferAdressee
        await sameAsContactPerson.scrollIntoViewIfNeeded()
        await sameAsContactPerson.check()
        await sameAsContactPerson.isChecked()
        console.log("------------Same as main contacct person checkbox selected.-----------")  
    }
    async verifyLetterOfOfferAddressee_Autofill(name:string,jobTitle:string,email:string){
        
        const offeree_name=this.lbl_offeree_name
        const offee_job=this.lbl_offeree_designation
        const offeeEmail=this.lbl_offeree_email

        await offeeEmail.scrollIntoViewIfNeeded()
        await expect(offeree_name).toHaveValue(name)
        await expect(offee_job).toHaveValue(jobTitle)
        await expect(offeeEmail).toHaveValue(email)
        console.log("------------Letter of offer adressee is successfully aluto filled.-----------")  
    }

    async saveContactDetailsConfig(){
        const saveButton=this.btn_save
        await saveButton.scrollIntoViewIfNeeded()
        await saveButton.click()
        console.log("------------Contact details save button clicked.-----------")  
        await this.page.waitForLoadState("networkidle") 
    }

    async reloadExistingPage(){
        await this.page.reload({
            timeout: 600000, 
            waitUntil: 'networkidle', 
          });
          console.log("-------------Page reloaded.-------------")
    }

    async verifySavedFunctionality(uname:string,ujob:string,ucontactNo:string,uemail:string,
        upo_code:string,ublkHse:string,ustreet:string,uofferee_name:string,uofferee_job:string,uofferee_email){
        const name=this.input_name
        const jobTitle=this.input_jobTitle
        const contactNo=this.input_ContactInfor
        const email=this.input_email
        
        const po_code=this.input_PostalCode
        const blkHse=this.lbl_blockHouse
        const street=this.lbl_streetName
        const offeree_name=this.lbl_offeree_name
        const offee_job=this.lbl_offeree_designation
        const offeeEmail=this.lbl_offeree_email

        await expect(name).toHaveValue(uname)
        await expect(jobTitle).toHaveValue(ujob)
        await expect(contactNo).toHaveValue(ucontactNo)
        await expect(email).toHaveValue(uemail)
        console.log("------------Main contact person values save verified.-----------")  
        
        await expect(po_code).toHaveValue(upo_code)
        await expect(blkHse).toHaveValue(ublkHse)
        await expect(street).toHaveValue(ustreet)
        console.log("------------Postal code address details verified.-----------")  
        await expect(offeree_name).toHaveValue(uofferee_name)
        await expect(offee_job).toHaveValue(uofferee_job)
        await expect(offeeEmail).toHaveValue(uofferee_email)
        console.log("------------Offeree details verified.-----------")  

    }
    async navigetToNextFormSection(){
        await this.btn_next.click()
        console.log("-------------Verify next section of form.-------------")
    }

    async verifyLetterOfOfferAddresseeFieds(){
        const offeree_name=this.lbl_offeree_name
        const offee_job=this.lbl_offeree_designation
        const offeeEmail=this.lbl_offeree_email

        await offeeEmail.scrollIntoViewIfNeeded()
        await expect(offeree_name).toBeVisible()
        console.log("---------Letter Of Offer Addressee name Fied displayed-----------")
        await expect(offee_job).toBeVisible()
        console.log("---------Letter Of Offer Addressee Job Fied displayed-----------")
        await expect(offeeEmail).toBeVisible()
        console.log("---------Letter Of Offer Addressee email Fied displayed-----------")
        
    }



}