import {expect, test} from "@playwright/test"
import SignInPage from "../pages/signInPage"
import PreLoginPage from "../pages/preLoginPage";
import LogingPage from "../pages/loginPage";
import HomePage from "../pages/homePage";
import LogoutSuccessPage from "../pages/logoutSuccessPage";


const password="bgPB3Aw3SomeGvtF@lk!";
const userName="temp-govtech";

test.describe("SignInTestSuite",()=>{
    test("SignIn to System with valid credentials",async({page,baseURL})=>{
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
        await page.waitForLoadState('networkidle');
        
        const homePage=new HomePage(page)
        await homePage.verifyHomePageBanner("my Grants") 
        await homePage.verifyLoggedInUser("Tan Ah Kow")
        await homePage.verifyLoggedInUserRole("Acceptor")
    })

    test("Invalid signIn faulty password varification",async({page,baseURL})=>{
        const signiIn=new SignInPage(page);
        await page.goto(`${baseURL}`,{ timeout: 60000 });
        await page.evaluate(() => {
            document.documentElement.requestFullscreen();
          });
        
        await signiIn.enterUserName(userName)
        await signiIn.enterUserPassword("Test123")
        await signiIn.signInToSystem()
        await signiIn.verifyErrorMessageTrigger("Incorrect username or password.")
    
    })
    test("Invalid signIn with Invalid Username",async({page,baseURL})=>{
        const signiIn=new SignInPage(page);
        await page.goto(`${baseURL}`,{ timeout: 60000 });
        await page.evaluate(() => {
            document.documentElement.requestFullscreen();
          });
        
        await signiIn.enterUserName("TestUser1")
        await signiIn.enterUserPassword(userName)
        await signiIn.signInToSystem()
        await signiIn.verifyErrorMessageTrigger("User does not exist.")
    })

    test("Logout from system after successful login.",async({page,baseURL})=>{
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
        await page.waitForLoadState('networkidle');
        
        const homePage=new HomePage(page)
        await homePage.verifyHomePageBanner("my Grants") 
        await homePage.logoutFromLoginUser()

        const logoutSuccessPage=new LogoutSuccessPage(page)
        logoutSuccessPage.verifyDisplayOfSuccessfulLogout("You have successfully logged out.")

    })
})




