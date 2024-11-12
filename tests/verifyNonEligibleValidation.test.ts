import {expect, test} from "@playwright/test"
import SignInPage from "../pages/signInPage"
import HomePage from "../pages/homePage";
import LogingPage from "../pages/loginPage";
import PreLoginPage from "../pages/preLoginPage";
import BasePage from "../pages/basePage";
import data from "../testdata/data.json"

test.describe("Validation of non-eligible validation.",()=>{
    test("Newgrant non eligible validation verification.",async({page,baseURL})=>{    
        const basePage=new BasePage(page,`${baseURL}`);
        await basePage.initialize()

        console.log("-------------Navigate to Signin page.-------------")
        const signiIn=new SignInPage(page);          
            await signiIn.loginToSystemWithCredentials(data.userName,data.password)
        
            Promise.all([page.waitForLoadState('networkidle')])
            console.log("-------------Navigate to Pre-login page.-------------")
            const preLoginPage=new PreLoginPage(page);
            await preLoginPage.loginToBGP("FAQ")  
            Promise.all([page.waitForLoadState('networkidle')])
        
            console.log("-------------Navigate to Login page.-------------")
            const loginPage=new LogingPage(page);
            await loginPage.verifyPageBanner("Manual Log In")
            await loginPage.loginToBGPWithUserCredentials(data.uen,data.userId,data.role,data.name) 
            await page.waitForLoadState('networkidle');
            
            console.log("-------------Navigate to Home page.-------------")
            const homePage=new HomePage(page)
            await homePage.verifyHomePageBanner("my Grants")
           
    })
})
