import { test} from "@playwright/test"
import {SignInPage} from "../pages/signInPage"
import DashboardPage from "../pages/dashboardPage";
import LogingPage from "../pages/loginPage";
import PreLoginPage from "../pages/preLoginPage";
import BasePage from "../pages/basePage";
import data from "../testdata/data.json"
import NewGrantsPage from "../pages/newGrantsPage";
import GrantActionsPage from "../pages/grantActionsPage";
import CheckEligibilityPage from "../pages/checkEligibilityPage";

test.describe("Verification of validation messages.",()=>{
    test("Newgrant non eligible validation verification.",async({page,baseURL})=>{    
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
        await checkEligibilityPage.verifyMandetoryFieldLabel("* Mandatory field")
        await checkEligibilityPage.selectNoForTheApplicationRadioButtons("The applicant may not meet the eligibility criteria for this grant. Visit FAQ page for more information on other government grants.")

           
    })
})
