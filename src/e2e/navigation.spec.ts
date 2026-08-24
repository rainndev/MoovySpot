import test, { expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should navigate between pages correctly", async ({ page }) => {
    await page.goto("/");
    const homePage = page.getByRole("link", { name: "Home" });
    const watchList = page.getByRole("link", { name: "Watchlist" });
    const Category = page.getByRole("link", { name: "Category" });
    const RecentlyViewed = page.getByRole("link", { name: "Recent" });

    //navigate to watch list page
    await watchList.click({ force: true });
    await expect(page).toHaveURL(/\/watchlist$/);

    //navigate to category page
    await Category.click({ force: true });
    await expect(page).toHaveURL(/\/category$/);

    //navigate to Recently Viewed page
    await RecentlyViewed.click({ force: true });
    await expect(page).toHaveURL(/\/recent$/);

    await homePage.click({ force: true });
    await expect(page).toHaveURL("http://localhost:5173/");
  });

  test("should open/close search bar dialog", async ({ page }) => {
    await page.goto("/");
    const searchButton = page.locator(
      '[data-testid="search-button"]:visible, [data-testid="mobile-search-button"]:visible',
    );
    const closeButton = page.getByTestId("close-search-button");
    const searchInput = page.getByRole("textbox", { name: "Search..." });

    //check if search bar dialog is visible
    await searchButton.click();

    await expect(searchInput).toBeVisible();

    //check if search bar dialog is not visible after clicking the close button
    await closeButton.click();
    await expect(searchInput).not.toBeVisible({ timeout: 10000 });
  });
});
