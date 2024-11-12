import { expect, Page,Locator } from "@playwright/test";
import SignInPage from "./signInPage";
import PreLoginPage from "./preLoginPage";
import LogingPage from "./loginPage";
export default class BasePage{
    
    private page: Page;
    private baseURL: string;
    constructor(page:Page,baseURL: string){
        this.page = page;
        this.baseURL = baseURL;
    }
    
    async initialize() {
        await this.page.goto(this.baseURL, { timeout: 60000 });
        await this.page.evaluate(() => {
            document.documentElement.requestFullscreen();
          });
          
    }

    
}