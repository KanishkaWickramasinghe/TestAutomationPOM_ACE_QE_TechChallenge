import { expect, Locator, Page } from "@playwright/test";

export default class LogingPage{

    readonly lbl_pageBanner:Locator;
    readonly input_UEN:Locator;
    readonly input_addUserId:Locator;
    readonly input_addUserRole:Locator;
    readonly input_addUserFullName:Locator;
    readonly btn_login: Locator;

    constructor(public page:Page){
        this.lbl_pageBanner=page.locator('xpath=//form[@role="form"]/parent:: div/h1')
        this.input_UEN=page.locator("#entityId")
        this.input_addUserId=page.locator("#userId")
        this.input_addUserRole=page.locator("#userRole")
        this.input_addUserFullName=page.locator("#userFullName")
        this.btn_login=page.locator('xpath=//form[@role="form"]/button')
    }

    async verifyPageBanner(bannerText:string){
        const banner=await this.lbl_pageBanner
        expect(banner).toHaveText(bannerText)
    }

    async addEntityUEN(uen:string){
        await this.input_UEN.type(uen)
    }

    async addUserId(userId:string){
        await this.input_addUserId.type(userId)
    }
    async addUserRole(userRole:string){
        await this.input_addUserRole.type(userRole)
    }
    async addUserFullName(userFullName:string){
        await this.input_addUserFullName.type(userFullName)
    }
    async loginWithManualLogin(){
        await this.btn_login.click()
    }

    
}

