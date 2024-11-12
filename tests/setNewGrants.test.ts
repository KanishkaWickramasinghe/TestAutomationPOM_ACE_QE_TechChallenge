import {expect, test} from "@playwright/test"
import SignInPage from "../pages/signInPage"
import PreLoginPage from "../pages/preLoginPage";
import LogingPage from "../pages/loginPage";
import DashboardPage from "../pages/dashboardPage";
import NewGrantsPage from "../pages/newGrantsPage";
import GrantActionsPage from "../pages/grantActionsPage";
import CheckEligibilityPage from "../pages/checkEligibilityPage";
import BasePage from "../pages/basePage";
import data from "../testdata/data.json"



test.describe("Set new grants.",()=>{
    test("Set a new grant",async({page,baseURL})=>{
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
        console.log("-------------Navigate to Homepage.-------------")
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
        await grantActionsPage.verifyGrantActionsApplicationForm("Application Form")
        await grantActionsPage.proceedToFormApplication()
        

        const checkEligibilityPage=new CheckEligibilityPage(page)
        console.log("-------------Navigate to check availablity.-------------")
        await checkEligibilityPage.verifyCheckEligibilityPageBanner("Check Your Eligibility")
        await checkEligibilityPage.verifyMandetoryFieldLabel("* Mandatory field")
        await checkEligibilityPage.verifyApplicationSectionCount(6)

        await checkEligibilityPage.verifyDisplayed_Q1("Is the applicant registered in Singapore? *")
        await checkEligibilityPage.verifyDisplayed_Q2("Is the applicant's group sales turnover less than or equal to S$100m or is the applicant's group employment size less than or equal to 200? *")
        await checkEligibilityPage.verifyDisplayed_Q3("Does the applicant have at least 30%  local equity? *")
        await checkEligibilityPage.verifyDisplayed_Q4("Are the target market(s) that you are applying for a new market? A market is considered new if your company's revenue from there has not exceeded $100,000 in any of the last 3 years. *")
        await checkEligibilityPage.verifyDisplayed_Q5("Are all the following statements true for this project? *  The applicant has not started work on this project  The applicant has not made any payment to any supplier, vendor, or third party prior to applying for this grant   The applicant has not signed any contractual agreement with any supplier, vendor, or third party prior to applying for this grant  ")

        await checkEligibilityPage.selectYesTo_IsSinagporian()
        await checkEligibilityPage.selectYesTo_groupSsalesTurnoverIsLessThan100()
        await checkEligibilityPage.selectYesTo_react_eligibility_global_hq_check()
        await checkEligibilityPage.selectYesTo_react_eligibility_new_target_market_check()
        await checkEligibilityPage.selectYesTo_react_eligibility_started_project_check()
        await checkEligibilityPage.saveFormEligibilitySectionAsDraft()
        await checkEligibilityPage.verifyToastMessage("Draft Saved")
        await checkEligibilityPage.reloadExistingPage()
        await checkEligibilityPage.verifySaveFunctionality() 
    })
})