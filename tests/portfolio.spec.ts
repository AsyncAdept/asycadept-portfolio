import { test, expect } from "@playwright/test";

test.describe("Portfolio Website", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load main page without errors", async ({ page }) => {
    await expect(page).toHaveTitle(/AsycAdept/);
  });

  test("should display hero section", async ({ page }) => {
    await expect(
      page.getByText("Full Stack TypeScript Engineer")
    ).toBeVisible();
  });

  test("should display navigation", async ({ page }) => {
    await expect(page.getByRole("link", { name: "About" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Skills" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Projects" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Contact" })).toBeVisible();
  });

  test("should have working navigation links", async ({ page }) => {
    await page.getByRole("link", { name: "About" }).click();
    await expect(page.locator("#about")).toBeInViewport();

    await page.getByRole("link", { name: "Skills" }).click();
    await expect(page.locator("#skills")).toBeInViewport();

    await page.getByRole("link", { name: "Projects" }).click();
    await expect(page.locator("#projects")).toBeInViewport();

    await page.getByRole("link", { name: "Contact" }).click();
    await expect(page.locator("#contact")).toBeInViewport();
  });

  test("should display skills section", async ({ page }) => {
    await page.locator("#skills").scrollIntoViewIfNeeded();
    await expect(
      page.getByText("Frontend Engineering")
    ).toBeVisible();
    await expect(page.getByText("Mobile")).toBeVisible();
    await expect(page.getByText("Cross-Platform")).toBeVisible();
  });

  test("should display projects section", async ({ page }) => {
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await expect(
      page.getByText("Targeted Messaging Platform")
    ).toBeVisible();
    await expect(
      page.getByText("Real-Time Social Firehose")
    ).toBeVisible();
    await expect(page.getByText("AutoUI Generator")).toBeVisible();
    await expect(
      page.getByText("Cross-Platform Mobile Banking")
    ).toBeVisible();
  });

  test("should display contact form", async ({ page }) => {
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Subject")).toBeVisible();
    await expect(page.getByLabel("Message")).toBeVisible();
  });

  test("should validate contact form", async ({ page }) => {
    await page.locator("#contact").scrollIntoViewIfNeeded();
    
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByText("Name must be at least 2 characters")).toBeVisible();
  });

  test("should open terminal component", async ({ page }) => {
    await page.getByRole("button").filter({ hasText: "" }).last().click();
    await expect(page.getByText("asycadept@portfolio")).toBeVisible();
  });

  test("should have accessible colors", async ({ page }) => {
    const html = await page.content();
    expect(html).toContain("dark");
  });
});
