import {expect, test,Browser, chromium} from "@playwright/test"
import PreLoginPage from "../pages/preLoginPage";
import LogingPage from "../pages/loginPage";
import HomePage from "../pages/homePage";
import SignInPage from "../pages/signInPage";
import FAQPage from "../pages/faqPage";


test.describe("Verify opening of FAQ page.",()=>{
    const password="bgPB3Aw3SomeGvtF@lk!";
    const userName="temp-govtech";
    

    test("Test FAQ opening",async({page,baseURL})=>{
        

        const signiIn=new  SignInPage(page)
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
        await page.waitForLoadState('networkidle');
        
        const homePage=new HomePage(page)
        await homePage.verifyHomePageBanner("my Grants")
 
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),  // Waits for the new tab
            await homePage.verifyOpeningOf_FAQTab()
        ]);
        await page.waitForLoadState('networkidle');
        
        const faqPage=new FAQPage(newPage)
        await page.waitForLoadState('networkidle');
        await faqPage.verifyFAQPageBanner("Business Grants Portal FAQ")
        //await newPage.close()

    })
})