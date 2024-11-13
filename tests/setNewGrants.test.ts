import {expect, test} from "@playwright/test"
import { SignInPage } from "../pages/signInPage";
import PreLoginPage from "../pages/preLoginPage";
import LogingPage from "../pages/loginPage";
import DashboardPage from "../pages/dashboardPage";
import NewGrantsPage from "../pages/newGrantsPage";
import GrantActionsPage from "../pages/grantActionsPage";
import CheckEligibilityPage from "../pages/checkEligibilityPage";
import BasePage from "../pages/basePage";
import data from "../testdata/data.json"
import contactData from "../testdata/mainContactPersonData.json"
import projectDetails from "../testdata/projectDetails.json"
import ContactInforPage from "../pages/contactInforPage";
import ProposalPage from "../pages/proposalPage";



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
        await grantActionsPage.proceedToFormApplication()
        Promise.all([page.waitForLoadState('networkidle')])
        await page.waitForLoadState('networkidle',{timeout:1000000});
        

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
        await checkEligibilityPage.saveEligibilityConfig()
        await page.waitForLoadState('networkidle',{timeout:1000000});
        
        await checkEligibilityPage.verifyToastMessage("Draft Saved")
        await checkEligibilityPage.reloadExistingPage()
        await page.waitForLoadState('networkidle',{timeout:1000000});
        await checkEligibilityPage.verifySaveFunctionality() 
        await checkEligibilityPage.selectNoForTheApplicationRadioButtons("The applicant may not meet the eligibility criteria for this grant. Visit FAQ page for more information on other government grants.")
        await checkEligibilityPage.navigetToNextFormSection()
        await page.waitForLoadState('networkidle',{timeout:1000000});
        Promise.all([page.waitForLoadState('networkidle',{timeout:5000000})])
        

        const contactInforPage=new ContactInforPage(page)
        await contactInforPage.verifyPageBanner("Provide Your Contact Details")
        await contactInforPage.verifyDisplayOfMainContactPersonInputFields()
        await contactInforPage.addMainContactName(contactData.name)
        await contactInforPage.addMainJobTitle(contactData.jobTitle)
        await contactInforPage.addMainContactNumber(contactData.contactNo)
        await contactInforPage.addEmailAddressDetails(contactData.email,contactData.altEmail)    
        await page.waitForLoadState('networkidle',{timeout:1000000});
        
        await contactInforPage.filterforInvalidPostalCode(contactData.postalCode)
        await page.waitForLoadState('networkidle',{timeout:1000000});
        await contactInforPage.addMailingAddressManually(contactData.postalCode,"531","ANG MO KIO AVENUE 10")

        // contactInforPage.filterforInvalidPostalCode("160304")
        // contactInforPage.verifyPostalCodeValidationMessage("We can't find the postal code. Please try again.")
        // await page.waitForLoadState('networkidle',{timeout:1000000});

        await contactInforPage.verifyLetterOfOfferAddresseeFieds()
        
        await contactInforPage.checkSameAsMainMontactPerson()
        await page.waitForLoadState('networkidle',{timeout:1000000});
        await contactInforPage.verifyLetterOfOfferAddressee_Autofill(contactData.name,contactData.jobTitle,contactData.email)
        await contactInforPage.saveContactDetailsConfig()
        await page.waitForLoadState("networkidle",{timeout:500000})

        await contactInforPage.reloadExistingPage()
        await contactInforPage.verifySavedFunctionality(contactData.name,contactData.jobTitle,contactData.contactNo,contactData.email,
            contactData.postalCode,contactData.blkNo,contactData.streetName, contactData.name ,contactData.jobTitle,contactData.email
        )
        await contactInforPage.navigetToNextFormSection()
        
        const proposalPage=new ProposalPage(page)
        await page.waitForLoadState('networkidle',{timeout:1000000});
        await proposalPage.addProposalName(projectDetails.projectName)
        await proposalPage.addProjectDescription(projectDetails.projectDescription)
        await proposalPage.addProjectStartDate(projectDetails.startDate)
        await proposalPage.addProjectEndDate(projectDetails.endDate)
        await proposalPage.selectIsTragetMarketOutsideSingapore()
        await proposalPage.selectFile("")
        

    })
})