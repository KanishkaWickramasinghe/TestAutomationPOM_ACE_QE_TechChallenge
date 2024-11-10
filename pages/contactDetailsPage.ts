import { Locator, Page } from "@playwright/test";
export default class ContactDetailsPage{
    readonly lbl_pageBanner:Locator;
    readonly lbl_mandetory:Locator;
    readonly lbl_mainContactPerson:Locator;
    readonly input_name:Locator;
    readonly input_JobTitle:Locator;
    readonly input_ContactNo:Locator;
    readonly input_Email:Locator;
    readonly input_AltEmail:Locator;
    

    constructor(public page:Page){
        this.lbl_pageBanner=page.locator("//h1[@class='grant-title ']/following-sibling::div/h2")
        this.lbl_mandetory=page.locator("//h1[@class='grant-title ']/following-sibling::div[@class='helptext-wrapper']//span")
        this.lbl_mainContactPerson=page.locator("//div[@class='subsection-title']/h3[text()='Main Contact Person']")
        this.input_name=page.locator("#react-contact_info-name")
        this.input_JobTitle=page.locator("#react-contact_info-designation")
        this.input_Email=page.locator("#react-contact_info-phone")
        this.input_ContactNo=page.locator("#react-contact_info-phone")
        this.input_AltEmail=page.locator("#react-contact_info-secondary_email")
    }


}