import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("user can log in successfully", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});

test("error shown for invalid password", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("standard_user", "wrongPassword");

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText(
    "Username and password do not match",
  );
});

test("locked out user specific error message", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("locked_out_user", "secret_sauce");

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText(
    "Epic sadface: Sorry, this user has been locked out.",
  );
});

test("error shown for no credentials entered", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.loginButton.click();

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText(
    "Epic sadface: Username is required",
  );
});

test("password field is masked", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  await expect(loginPage.passwordField).toHaveAttribute("type", "password");
});
