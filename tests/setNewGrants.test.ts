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
        await page.waitForLoadState('networkidle',{timeout:1000000});
        Promise.all([page.waitForLoadState('networkidle')])
        
        const homePage=new HomePage(page)
        await homePage.verifyHomePageBanner("my Grants") 
        await homePage.navigateToNewGrants()
        await page.waitForLoadState('load',{ timeout: 10000000 }); 
    
        const newGrantsPage=new NewGrantsPage(page);
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
        await grantActionsPage.verifyGrantActionsPage("Grant Actions")
        await grantActionsPage.verifyGrantActionsApplicationForm("Application Form")
        await grantActionsPage.proceedToFormApplication()

        const checkEligibilityPage=new CheckEligibilityPage(page)
        await checkEligibilityPage.verifyCheckEligibilityPageBanner("Check Your Eligibility")
        await checkEligibilityPage.verifyMandetoryFieldLabel("* Mandatory field")
        await checkEligibilityPage.verifyApplicationSectionCount(6)
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