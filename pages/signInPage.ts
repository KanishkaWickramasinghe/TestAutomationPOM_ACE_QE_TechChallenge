import {expect, Locator, Page} from "@playwright/test"

export default class SignInPage{
    readonly input_username: Locator;
    readonly input_password: Locator;
    readonly btn_SignIn: Locator;
    readonly lbl_errorMessage:Locator;



    constructor(public page: Page){
        this.input_username=page.locator(".visible-md.visible-lg input[name='username']").nth(0)
        this.input_password=page.locator(".visible-md.visible-lg input[name='password']").nth(0)
        this.btn_SignIn=page.locator('.visible-md.visible-lg input[name="signInSubmitButton"]').nth(0)
        this.lbl_errorMessage=page.locator("//div[@class='modal-content background-customizable modal-content-desktop visible-md visible-lg']//form//label[text()='Username']//parent::form/p[@id='loginErrorMessage']")

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

    async verifyErrorMessageTrigger(message:string){
        const errorMessage=this.lbl_errorMessage
        await errorMessage.waitFor({state:"visible",timeout:500000})
        expect(errorMessage).toHaveText(message)
    }
}