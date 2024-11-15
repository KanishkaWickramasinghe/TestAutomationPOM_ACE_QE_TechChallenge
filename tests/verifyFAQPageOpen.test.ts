import {expect, test,Browser, chromium} from "@playwright/test"
import PreLoginPage from "../pages/preLoginPage";
import LogingPage from "../pages/loginPage";
import DashboardPage from "../pages/dashboardPage";
import {SignInPage} from "../pages/signInPage";
import FAQPage from "../pages/faqPage";
import BasePage from "../pages/basePage";
import data from "../testdata/data.json"
import GrantActionsPage from "../pages/grantActionsPage";
import NewGrantsPage from "../pages/newGrantsPage";
import CheckEligibilityPage from "../pages/checkEligibilityPage";


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
        await faqPage.verifyUniqBannerFrolLoginPoint("About")
    })

    test("Test opening of FAQ via eligibility page validation message.",async({page,baseURL})=>{
        
        const basePage=new BasePage(page,`${baseURL}`);
        await basePage.initialize()

        const signiIn=new SignInPage(page);
        console.log("-------------Navigate to Signin page.-------------")
        await signiIn.loginToSystemWithCredentials(data.userName,data.password)
        
        Promise.all([page.waitForLoadState('networkidle')])
        const preLoginPage=new PreLoginPage(page);
        console.log("-------------Navigate to pre-login page.-------------")
        await preLoginPage.loginToBGP("FAQ")    
        
        Promise.all([page.waitForLoadState('networkidle')])
    
        const loginPage=new LogingPage(page);
        console.log("-------------Navigate to Login page-------------")
        await loginPage.verifyPageBanner("Manual Log In")
        await loginPage.loginToBGPWithUserCredentials(data.uen,data.userId,data.role,data.name)
        
        await page.waitForLoadState('networkidle',{timeout:1000000});
        Promise.all([page.waitForLoadState('networkidle')])
        
        const dashboardPage=new DashboardPage(page)
        console.log("-------------Navigate to Dashboard.-------------")
        await dashboardPage.verifyHomePageBanner("my Grants") 
        await dashboardPage.navigateToNewGrants()
        await page.waitForLoadState('load',{ timeout: 10000000 }); 
        
        const newGrantsPage=new NewGrantsPage(page);
        console.log("-------------Navigate to NewGrants page.-------------")
        await newGrantsPage.verifyNewGrantsBanner("Which sector best describes your business?")

        await page.waitForLoadState('networkidle',{timeout:1000000});
        await newGrantsPage.pickGrantTypeByText_IT()
        await page.waitForLoadState('networkidle',{timeout:1000000});

        await newGrantsPage.verifySelectedGrantPageNavigation("I need this grant to")
        await newGrantsPage.selectBringMyBusinessOverSeas()
        await newGrantsPage.marketReadinessAssistance()
        await newGrantsPage.applyForGrantAfterConfig()
        
        Promise.all([page.waitForLoadState('networkidle')])

        const grantActionsPage= new GrantActionsPage(page)
        console.log("-------------Navigate to grant actions page.-------------")
        await grantActionsPage.verifyGrantActionsPage("Grant Actions")
        await grantActionsPage.proceedToFormApplication()
        Promise.all([page.waitForLoadState('networkidle')])
        await page.waitForLoadState('networkidle',{timeout:1000000});
        
        const checkEligibilityPage=new CheckEligibilityPage(page)
        console.log("-------------Navigate to check availablity.-------------")
        await checkEligibilityPage.verifyCheckEligibilityPageBanner("Check Your Eligibility")
        await checkEligibilityPage.selectNoForTheApplicationRadioButtons("The applicant may not meet the eligibility criteria for this grant. Visit FAQ page for more information on other government grants.")
        
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),  
            await checkEligibilityPage.navigatToFAQViaValMessage()
        ]);
        await page.waitForLoadState('networkidle');
        console.log("-------------Navigate to FAQ page.-------------")

        const faqPage=new FAQPage(newPage)
        await faqPage.verifyNavigatedURL()
        await page.waitForLoadState('networkidle');
        await faqPage.verifyFAQPageBanner("Get a Grant")
        await faqPage.verifyUniqBannerFrolLoginPoint("Get a Grant")
    })
})