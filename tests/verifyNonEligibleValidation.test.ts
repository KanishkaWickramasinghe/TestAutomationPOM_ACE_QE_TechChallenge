import {expect, test} from "@playwright/test"
import SignInPage from "../pages/signInPage"
import HomePage from "../pages/homePage";
import LogingPage from "../pages/loginPage";
import PreLoginPage from "../pages/preLoginPage";

test.describe("Validation of non-eligible validation.",()=>{
    const password="bgPB3Aw3SomeGvtF@lk!";
    const userName="temp-govtech";
    test("Newgrant non eligible validation verification.",async({page,baseURL})=>{
        const signiIn=new SignInPage(page);
            await page.goto(`${baseURL}`,{ timeout: 60000 });
            await page.evaluate(() => {
                document.documentElement.requestFullscreen();
              });
            
            await signiIn.enterUserName(userName)
            await signiIn.enterUserPassword(password)
            await signiIn.signInToSystem()
        
            Promise.all([page.waitForLoadState('networkidle')])
            const preLoginPage=new PreLoginPage(page);
            await preLoginPage.verifyPreLoginPageHeader("FAQ")
            await preLoginPage.loginToBGP()  
            Promise.all([page.waitForLoadState('networkidle')])
        
            const loginPage=new LogingPage(page);
            await loginPage.verifyPageBanner("Manual Log In")
             
            await loginPage.addEntityUEN("BGPQETECH")
            await loginPage.addUserId("S1234567A")
            await loginPage.addUserRole("Acceptor")
            await loginPage.addUserFullName("Tan Ah Kow")
            await loginPage.loginWithManualLogin()  
            //await page.waitForLoadState('load',{ timeout: 600000 });
            await page.waitForLoadState('networkidle');
            
            const homePage=new HomePage(page)
            
            await homePage.verifyHomePageBanner("my Grants")
           
    })
})
