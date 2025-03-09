import { expect } from '@playwright/test';
import {test} from '../pages/base';
import { validUsers, invalidUsers } from '../test-data/users';

test.describe('LOGIN FUNTION', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('TC-001: Input fields should display as the data that was filled', async ({ loginPage }) => {
        await loginPage.fillUserPassword('testuser', 'password');
        expect(await loginPage.getUsername()).toBe('testuser');
        expect(await loginPage.getPassword()).toBe('password');
    });

    test('TC-002: Should show an error message if log in without a username', async ({ loginPage }) => {
        await loginPage.fillUserPassword('', 'password');
        await loginPage.clickLogin();
        const message = await loginPage.getErrorMessage();
        console.log(message);
        expect(message).toContain('is required');
        expect(loginPage.isValidUrl()).toBe(true);
    });

    test('TC-003: Should show an error message if log in without a password', async ({ loginPage }) => {
        await loginPage.fillUserPassword('testuser', '');
        await loginPage.clickLogin();
        const message = await loginPage.getErrorMessage();
        console.log(message);
        expect(message).toContain('is required');
        expect(loginPage.isValidUrl()).toBe(true);
    });

    test('TC-004: Should show an error message if log in with both fields blank', async ({ loginPage }) => {
        await loginPage.fillUserPassword('', '');
        await loginPage.clickLogin();
        expect(await loginPage.getErrorMessage()).toContain('is required');
        expect(loginPage.isValidUrl()).toBe(true);
    });

    validUsers.forEach(({ username, password  }) => {
        test(`TC-005: Should logged in successfully with valid credentials: ${username}`, async ({ loginPage }) => {
            await loginPage.fillUserPassword(username, password);
            await loginPage.clickLogin();
            expect(await loginPage.getErrorMessage()).not.toContain('is required');
            expect(loginPage.isValidUrl()).toBe(false);
        });
    });

    invalidUsers.forEach(({ username, password }) => {
        test(`TC-006: Should logged in fails with an error message when using invalid credentials: ${username}`, async ({ loginPage }) => {
            await loginPage.fillUserPassword(username, password);
            await loginPage.clickLogin();
            expect(await loginPage.getErrorMessage()).toContain('Epic sadface');
            expect(loginPage.isValidUrl()).toBe(true);
        });
    });

});