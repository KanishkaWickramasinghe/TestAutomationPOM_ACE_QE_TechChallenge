import { expect, Locator, Page } from "@playwright/test";

export default class GrantActionsPage{

    readonly lbl_pageBanner:Locator;
    readonly btn_proceed:Locator;


    constructor(public page:Page){
        this.lbl_pageBanner=page.locator(".main.card-bg h2")
        this.btn_proceed=page.locator("#keyPage-form-button")
    }

    async verifyGrantActionsPage(label:string){
        const pageBanner=this.lbl_pageBanner
        expect(pageBanner).toHaveText(label)
        console.log("-------------Grant action page loaded.-------------")
    }
    
    async proceedToFormApplication(){
        const proceedBtn=this.btn_proceed
        await proceedBtn.click()  
        console.log("-------------Proceed to grant application form.-------------")
    }
    
    
}