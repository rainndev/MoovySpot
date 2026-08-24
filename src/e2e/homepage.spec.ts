import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load and display main elements", async ({ page }) => {
    await page.goto("/");

    const heroTitle = page.getByTestId("hero-title");
    const heroDescription = page.getByTestId("hero-description");

    await expect(heroTitle).toContainText("Your Movie Night");
    await expect(heroTitle).toContainText("Starts Here");
    await expect(heroDescription).toHaveText(
      "Discover the ultimate movie night experience with our curated selection",
    );

    //check page title
    await expect(page).toHaveTitle(/MoovySpot/);
  });

  test("should load trending this week", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Trending This Week" })).toBeVisible();
  });

  test("should load trending today", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Trending Today" })).toBeVisible();
  });

  test("should load popular movies", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Popular" })).toBeVisible();
  });

  test("should load upcoming movies", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText(/MoovySpot is a personal project/)).toBeVisible();
  });

  test("should switch type of show", async ({ page }) => {
    // Always await navigation
    await page.goto("/");

    const tvShowButton = page.getByText("TV Shows", { exact: true });
    const movieShowButton = page.getByText("Movie", { exact: true });

    // Click TV Shows and check class
    await tvShowButton.click();
    await expect(tvShowButton).toHaveClass(/bg-logo-white\/10/);

    // Click Movie and check that Movie has the active class
    await movieShowButton.click();
    await expect(movieShowButton).toHaveClass(/bg-logo-white\/10/);

    // (Optional) ensure TV button lost its active class
    await expect(tvShowButton).toHaveClass(/bg-logo-white\/1/);
  });

  test("should redirect to details page", async ({ page }) => {
    await page.goto("/");

    const tvShowButton = page.getByText("TV Shows", { exact: true });

    await tvShowButton.click();
    await page.getByRole("heading", { name: "Trending Today" }).locator("..").getByRole("link").first().click({ force: true });

    await expect(page).toHaveURL(/details\/\d+\?type=tv/);
  });
});
