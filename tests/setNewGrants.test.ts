import {expect, test} from "@playwright/test"
import SignInPage from "../pages/signInPage"
import PreLoginPage from "../pages/preLoginPage";
import LogingPage from "../pages/loginPage";
import HomePage from "../pages/homePage";
import NewGrantsPage from "../pages/newGrantsPage";
import GrantActionsPage from "../pages/grantActionsPage";
import CheckEligibilityPage from "../pages/checkEligibilityPage";

const password="bgPB3Aw3SomeGvtF@lk!";
const userName="temp-govtech";

test.describe("Set new grants.",()=>{
    test("Set a new grant",async({page,baseURL})=>{
        const signiIn=new SignInPage(page);
        await page.goto(`${baseURL}`,{ timeout: 60000 });
        await page.evaluate(() => {
            document.documentElement.requestFullscreen();
          });
        
        await signiIn.enterUserName(userName)
        console.log("-------------User name "+userName+" added.-------------")
        await signiIn.enterUserPassword(password)
        console.log("-------------User name "+password+" added.-------------")
        await signiIn.signInToSystem()
        console.log("-------------SignIn completed and navigate to preLogin-------------")
    
        Promise.all([page.waitForLoadState('networkidle')])
        const preLoginPage=new PreLoginPage(page);
        await preLoginPage.verifyPreLoginPageHeader("FAQ")
        await preLoginPage.loginToBGP()  
        console.log("-------------Navigate to login-------------")
        Promise.all([page.waitForLoadState('networkidle')])
    
        const loginPage=new LogingPage(page);
        await loginPage.verifyPageBanner("Manual Log In")
        await loginPage.addEntityUEN("BGPQETECH")
        await loginPage.addUserId("S1234567A")
        await loginPage.addUserRole("Acceptor")
        await loginPage.addUserFullName("Tan Ah Kow")
        await loginPage.loginWithManualLogin()  
        console.log("-------------Login completed-------------")
        //await page.waitForLoadState('load',{ timeout: 600000 });
        await page.waitForLoadState('networkidle',{timeout:1000000});
        Promise.all([page.waitForLoadState('networkidle')])
        
        const homePage=new HomePage(page)
        console.log("-------------Verify homepage navigation-------------")
        await homePage.verifyHomePageBanner("my Grants") 
        await homePage.navigateToNewGrants()
        await page.waitForLoadState('load',{ timeout: 10000000 }); 
        console.log("-------------Navigate to new grants page.-------------")
    
        const newGrantsPage=new NewGrantsPage(page);
        await newGrantsPage.verifyNewGrantsBanner("Which sector best describes your business?")

        await page.waitForLoadState('networkidle',{timeout:1000000});
        await newGrantsPage.pickGrantTypeByText_IT()
        console.log("-------------Clicked IT on grant picker item.-------------")
        await page.waitForLoadState('networkidle',{timeout:1000000});

        await newGrantsPage.verifySelectedGrantPageNavigation("I need this grant to")
        await newGrantsPage.selectBringMyBusinessOverSeas()
        console.log("-------------select Bring My Business OverSeas.-------------")
        await newGrantsPage.marketReadinessAssistance()
        console.log("-------------market Readiness Assistance.-------------")
        await newGrantsPage.applyForGrantAfterConfig()
        console.log("-------------Apply for grant.-------------")
        Promise.all([page.waitForLoadState('networkidle')])

        const grantActionsPage= new GrantActionsPage(page)
        await grantActionsPage.verifyGrantActionsPage("Grant Actions")
        await grantActionsPage.verifyGrantActionsApplicationForm("Application Form")
        await grantActionsPage.proceedToFormApplication()
        console.log("-------------Proceed to grant application form.-------------")

        const checkEligibilityPage=new CheckEligibilityPage(page)
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