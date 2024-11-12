import {expect, test} from "@playwright/test"
import SignInPage from "../pages/signInPage"
import PreLoginPage from "../pages/preLoginPage";
import LogingPage from "../pages/loginPage";
import DashboardPage from "../pages/dashboardPage";
import LogoutSuccessPage from "../pages/logoutSuccessPage";
import BasePage from "../pages/basePage";
import data from "../testdata/data.json"

// const password=data.userName;
// const userName=data.password;

// const uen="BGPQETECH";
// const userId="S1234567A";
// const role="Acceptor";
// const name="Tan Ah Kow";

test.describe("SignInTestSuite",()=>{
    test("SignIn to System with valid credentials",async({page,baseURL})=>{
      const basePage=new BasePage(page,`${baseURL}`);
      await basePage.initialize()
        
        
        await page.waitForLoadState('networkidle');
        const signiIn=new SignInPage(page);
        await signiIn.loginToSystemWithCredentials(data.userName,data.password)
    
        Promise.all([page.waitForLoadState('networkidle')])
        const preLoginPage=new PreLoginPage(page);
        await preLoginPage.loginToBGP("FAQ")    
        Promise.all([page.waitForLoadState('networkidle')])
    
        const loginPage=new LogingPage(page);
        await loginPage.verifyPageBanner("Manual Log In") 
        await loginPage.loginToBGPWithUserCredentials(data.uen,data.userId,data.role,data.name)   
        await page.waitForLoadState('networkidle');
        
        const dashboardPage=new DashboardPage(page)
        await dashboardPage.verifyHomePageBanner("my Grants") 
        await dashboardPage.verifyLoggedInUser(data.name)
        await dashboardPage.verifyLoggedInUserRole(data.role)
    })

    test("Invalid signIn faulty password varification",async({page,baseURL})=>{
      const basePage=new BasePage(page,`${baseURL}`);
      await basePage.initialize()
        const signiIn=new SignInPage(page);        
        await signiIn.loginToSystemWithCredentials(data.userName,"Test123")
        await signiIn.verifyErrorMessageTrigger("Incorrect username or password.")
    
    })
    test("Invalid signIn with Invalid Username",async({page,baseURL})=>{
      const basePage=new BasePage(page,`${baseURL}`);
      await basePage.initialize()

      console.log("-------------Navigate to Signin page.-------------")
      const signiIn=new SignInPage(page);
      await signiIn.loginToSystemWithCredentials("TestUser",data.password)
      await signiIn.verifyErrorMessageTrigger("User does not exist.")
    })

    test("Logout from system after successful login.",async({page,baseURL})=>{
      const basePage=new BasePage(page,`${baseURL}`);
      await basePage.initialize()

      console.log("-------------Navigate to Signin page.-------------")
        const signiIn=new SignInPage(page);
        await signiIn.loginToSystemWithCredentials(data.userName,data.password)
    
        Promise.all([page.waitForLoadState('networkidle')])
        const preLoginPage=new PreLoginPage(page);
        await preLoginPage.loginToBGP("FAQ")  
        Promise.all([page.waitForLoadState('networkidle')])
    
        console.log("-------------Navigate to login page.-------------")
        const loginPage=new LogingPage(page);
        await loginPage.verifyPageBanner("Manual Log In")
         
        await loginPage.loginToBGPWithUserCredentials(data.uen,data.userId,data.role,data.name)
        await page.waitForLoadState('networkidle');
        
        console.log("-------------Navigate to Home page.-------------")
        const dashboardPage=new DashboardPage(page)
        await dashboardPage.verifyHomePageBanner("my Grants") 
        await dashboardPage.logoutFromLoginUser()

        console.log("-------------Navigate to Logout success page.-------------")
        const logoutSuccessPage=new LogoutSuccessPage(page)
        logoutSuccessPage.verifyDisplayOfSuccessfulLogout("You have successfully logged out.")

    })
})

