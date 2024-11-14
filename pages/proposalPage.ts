import { Locator, Page } from "@playwright/test";
export default class ProposalPage{
    readonly lbl_pageHeader:Locator;
    readonly input_projectTitle:Locator;
    readonly input_projectStartDate:Locator;
    readonly input_projectEndDate:Locator;
    readonly txtArea_projectDescription:Locator;
    readonly dropdown_activity:Locator;
    readonly dropdown_targerMarket:Locator;
    readonly radio_TragetMarket:Locator;
    readonly input_supportingDoc:Locator;
    readonly textArea_remarks:Locator;
    readonly btn_next:Locator;
    readonly activity_dropDownOption:Locator

    constructor(public page:Page){
        this.lbl_pageHeader=page.locator("//h1[@class='grant-title ']/following-sibling::div/h2");
        this.input_projectTitle=page.locator("#react-project-title");
        this.input_projectStartDate=page.locator("#react-project-start_date");
        this.input_projectEndDate=page.locator("#react-project-end_date");
        this.dropdown_activity=page.locator("//span[@id='react-select-project-activity--value']/div[@class='Select-placeholder']");
        this.dropdown_targerMarket=page.locator("//span[@id='react-select-project-primary_market--value']/div[@class='Select-placeholder']");
        this.radio_TragetMarket=page.locator("//input[@name='react-project-is_first_time_expand']/following-sibling::span[@class='radiobutton']");
        this.input_supportingDoc=page.locator("//input[@id='react-project-attachments-input']");
        this.txtArea_projectDescription=page.locator("#react-project-description")
        this.textArea_remarks=page.locator("#react-project-remarks")
        this.btn_next=page.locator("//button[text()='Next']")
        this.activity_dropDownOption=page.locator("//div[@role='option']")
    }

    async addProposalName(name:string){
        const projectName=this.input_projectTitle
        await projectName.fill(name)
        console.log("----------Project title added in proposal page-----------")
    }

    async addProjectStartDate(startDate:string){
        const projectStartDate=this.input_projectStartDate
        await projectStartDate.fill(startDate)
        console.log("----------Project start date added in proposal page-----------")
    }

    async addProjectEndDate(endDate:string){
        const projectEndDate=this.input_projectEndDate
        await projectEndDate.fill(endDate)
        console.log("----------Project end date added in proposal page-----------")
    }
    async addProjectDescription(description:string){
        const projectDescription=this.txtArea_projectDescription
        await projectDescription.fill(description)
        console.log("----------Project description added in proposal page-----------")
    }
    async addProjectRemarks(remarks:string){
        const projectRemarks=this.textArea_remarks
        await projectRemarks.fill(remarks)
        console.log("----------Project remarks added in proposal page-----------")
    }

    async navigateToNextPage(){
        const nextButton=this.btn_next
        await nextButton.click()
        console.log("----------Navigate to business report page from proposal page-----------")
    }

    async selectIsTragetMarketOutsideSingapore(){
        const radio=this.radio_TragetMarket
        await radio.nth(0).click()
        console.log("----------Traget Market Out side Singapore selected in proposal.-----------")
    }
    async selectFile(path:string){
        const filePath=this.input_supportingDoc
        await filePath.setInputFiles(path)
        console.log("----------File attachment attached successfully in the  proposal page.-----------")
    }

    async selectActivityFromDropDown(){
        const activity=this.dropdown_activity;
        await activity.click()
        await this.page.waitForTimeout(2000)
        await this.activity_dropDownOption.nth(0).click()
        console.log("-------------Activity selected from dropdown-----------")
    }

    async selectMarketFromDropDown(){
        const targetMarket=this.dropdown_targerMarket
        await targetMarket.click()
        await this.page.waitForTimeout(2000)
        await this.activity_dropDownOption.nth(0).click()
        console.log("-------------Activity selected from dropdown-----------")
    }
}