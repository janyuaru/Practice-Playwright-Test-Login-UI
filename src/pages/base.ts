import { test as base } from '@playwright/test';
import { LoginPage } from './login.page';

type baseFixture = {
    loginPage: LoginPage;
}

export const test = base.extend<baseFixture>({
    loginPage: async ({ page }, use) => {
        //(new LoginPage(page))จะทำให้ใช้ Fixture ได้ทุกที่ใน Test โดยไม่ต้องสร้างใหม่ (new object) ทุกครั้ง
        await use(new LoginPage(page));
    }
});