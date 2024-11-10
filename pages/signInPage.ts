import {Locator, Page} from "@playwright/test"

export default class SignInPage{
    readonly input_username: Locator;
    readonly input_password: Locator;
    readonly btn_SignIn: Locator;


    constructor(public page: Page){
        this.input_username=page.locator(".visible-md.visible-lg input[name='username']").nth(0)
        this.input_password=page.locator(".visible-md.visible-lg input[name='password']").nth(0)
        this.btn_SignIn=page.locator('.visible-md.visible-lg input[name="signInSubmitButton"]').nth(0)
    }

    
    async enterUserName(userName:string){
        await this.input_username.fill(userName)
    }
    async enterUserPassword(password:string){
        await this.input_password.fill(password)
    }
    async signInToSystem(){
        await this.btn_SignIn.click()
    }
}