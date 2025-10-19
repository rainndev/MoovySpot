import test, { expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should navigate between pages correctly", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    const homePage = page.getByRole("link").first();
    const watchList = page.getByRole("link").nth(1);
    const Category = page.getByRole("link").nth(2);
    const RecentlyViewed = page.getByRole("link").nth(3);

    //navigate to watch list page
    await watchList.click();
    await expect(page).toHaveURL("http://localhost:5173/watchlist");

    //navigate to category page
    await Category.click();
    await expect(page).toHaveURL("http://localhost:5173/category");

    //navigate to Recently Viewed page
    await RecentlyViewed.click();
    await expect(page).toHaveURL("http://localhost:5173/recent");

    await homePage.click();
    await expect(page).toHaveURL("http://localhost:5173/");
  });

  test("should open/close search bar dialog", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    const searchButton = page.getByTestId("search-button");
    const closeButton = page.getByRole("img").nth(1);
    const searchInput = page.getByRole("textbox", { name: "Search..." });

    //check if search bar dialog is visible
    await searchButton.click();

    await expect(searchInput).toBeVisible();

    //check if search bar dialog is not visible after clicking the close button
    await closeButton.click();
    await expect(searchInput).toBeHidden();
  });
});
