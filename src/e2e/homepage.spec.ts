import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load and display main elements", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    const heroTitle = page.getByTestId("hero-title");
    const heroDescription = page.getByTestId("hero-description");

    await expect(heroTitle).toHaveText("Your Movie Night Starts Here");
    await expect(heroDescription).toHaveText(
      "Tired of wasting time picking what to watch? MoovySpot gives you trending picks, personalized lists, and curated collections—all in one spot",
    );

    //check page title
    await expect(page).toHaveTitle(/MoovySpot/);
  });

  test("should load trending this week", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    const trendingThisWeek = page.locator(".absolute.inset-0.h-full").first();
    await expect(trendingThisWeek).toBeVisible();
  });

  test("should load trending today", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    const trendingToday = page
      .locator(
        ".hide-scrollbar.flex.snap-x.snap-mandatory.space-x-2.overflow-x-auto",
      )
      .first();
    await expect(trendingToday).toBeVisible();
  });

  test("should load popular movies", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    const popularMovies = page.locator(
      "div:nth-child(4) > .z-10.h-full.w-full > div > .hide-scrollbar",
    );

    await expect(popularMovies).toBeVisible();
  });

  test("should load upcoming movies", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    const upcomingMovies = page.locator(
      "div:nth-child(5) > .z-10.h-full.w-full > div > .hide-scrollbar",
    );

    await expect(upcomingMovies).toBeVisible();
  });

  test("should switch type of show", async ({ page }) => {
    // Always await navigation
    await page.goto("http://localhost:5173/");

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
    await page.goto("http://localhost:5173/");

    const tvShowButton = page.getByText("TV Shows", { exact: true });

    await tvShowButton.click();
    const trendingThisWeekItem = page
      .locator(".absolute.inset-0.h-full")
      .first();
    await trendingThisWeekItem.click();

    await expect(page.url()).toMatch(/details.*tv/);
  });
});
