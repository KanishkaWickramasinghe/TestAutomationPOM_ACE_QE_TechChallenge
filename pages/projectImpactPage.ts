import { expect, Locator, Page } from "@playwright/test";
export default class ProjectImpactPage{
    readonly lbl_pageBanner:Locator;
    readonly input_FYEndDate:Locator;
    readonly input_overseasSales:Locator;
    readonly input_overseasInvestments:Locator;
    readonly textArea_rationaleForProjectRemarks:Locator;
    readonly textArea_nonTanjibleBenifits:Locator;
    readonly btn_next:Locator;



    constructor(public page:Page){
        this.lbl_pageBanner=page.locator(".main h2")
        this.input_FYEndDate=page.locator("//input[@class='bgp-textfield form-control']")
        this.input_overseasSales=page.locator("//a[text()='Overseas Sales']/ancestor::tr//input")
        this.input_overseasInvestments=page.locator("//a[text()='Overseas Investments']/ancestor::tr//input")
        this.textArea_rationaleForProjectRemarks=page.locator("#react-project_impact-rationale_remarks")
        this.textArea_nonTanjibleBenifits=page.locator("#react-project_impact-benefits_remarks")
        this.btn_next=page.locator("//button[text()='Next']")
    }

    async verifyPageBannerInBusinessImpact(bannerTxt:string){
        const banner=this.lbl_pageBanner;
        await expect(banner).toHaveText(bannerTxt)
        console.log("-----------Business impact page banner verified.---------------")
    }

    async setFYEDate(date:string){
        const fyeDate=this.input_FYEndDate;
        await fyeDate.fill(date)
        console.log("-----------Business impact page FYE date added.---------------")
    }
    async setOverSeasSales1(usales:string){
        const sales=this.input_overseasSales
        await sales.nth(0).fill(usales)
        console.log("-----------Business impact page set overseas sales section1.---------------")
    }
    async setOverSeasSales2(usales:string){
        const sales=this.input_overseasSales
        await sales.nth(1).fill(usales)
        console.log("-----------Business impact page set overseas sales section2.---------------")
    }
    async setOverSeasSales3(usales:string){
        const sales=this.input_overseasSales
        await sales.nth(2).fill(usales)
        console.log("-----------Business impact page set overseas sales section3.---------------")
    }
    async setOverSeasSales4(usales:string){
        const sales=this.input_overseasSales
        await sales.nth(3).fill(usales)
        console.log("-----------Business impact page set overseas sales section4.---------------")
    }
    async setOverseasInvestment1(uinvestments:string){
        const investent=this.input_overseasInvestments;
        await investent.nth(0).fill(uinvestments)
        console.log("-----------Business impact page overseas investments added.---------------")
    }

    async setOverseasInvestment2(uinvestments:string){
        const investent=this.input_overseasInvestments;
        await investent.nth(1).fill(uinvestments)
        console.log("-----------Business impact page overseas investments added.---------------")
    }
    async setOverseasInvestment3(uinvestments:string){
        const investent=this.input_overseasInvestments;
        await investent.nth(2).fill(uinvestments)
        console.log("-----------Business impact page overseas investments added.---------------")
    }
    async setOverseasInvestment4(uinvestments:string){
        const investent=this.input_overseasInvestments
        await investent.nth(3).fill(uinvestments)
        console.log("-----------Business impact page overseas investments added.---------------")
    }

    async setBusinessImpactRemarks(uremarks:string){
        const remark=this.textArea_rationaleForProjectRemarks;
        await remark.fill(uremarks)
        console.log("-----------Business impact page business impact remarks added------------")
    }

    async setNonTangibleBenifits(benifits:string){
        const nonTangibleBenifits=this.textArea_nonTanjibleBenifits;
        await nonTangibleBenifits.fill(benifits)
        console.log("-----------Business impact page business impact remarks added------------")
    }
    async navigateToNextPage(){
        const nextButton=this.btn_next
        await nextButton.click()
        console.log("----------Navigate to business impact page from proposal page-----------")
    }

}