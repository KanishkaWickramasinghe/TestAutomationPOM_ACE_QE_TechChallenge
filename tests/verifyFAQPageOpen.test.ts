import {expect, test,Browser, chromium} from "@playwright/test"
import PreLoginPage from "../pages/preLoginPage";
import LogingPage from "../pages/loginPage";
import DashboardPage from "../pages/dashboardPage";
import {SignInPage} from "../pages/signInPage";
import FAQPage from "../pages/faqPage";
import BasePage from "../pages/basePage";
import data from "../testdata/data.json"


test.describe("Verify opening of FAQ page.",()=>{
    

    test("Test FAQ opening",async({page,baseURL})=>{
        const basePage=new BasePage(page,`${baseURL}`);
        await basePage.initialize()

        console.log("-------------Navigate to Signin page.-------------")
        const signiIn=new  SignInPage(page)
        await page.waitForLoadState('networkidle');
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
        const dashboardPage=new DashboardPage(page)
        await dashboardPage.verifyHomePageBanner("my Grants")
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),  
            await dashboardPage.verifyOpeningOf_FAQTab()
        ]);
        await page.waitForLoadState('networkidle');
        
        console.log("-------------Navigate to FAQ page.-------------")
        const faqPage=new FAQPage(newPage)
        await page.waitForLoadState('networkidle');
        await faqPage.verifyFAQPageBanner("Business Grants Portal FAQ")

    })
})