import { expect, test } from "@playwright/test";

test.describe("Category Page", () => {
  const categoryUrl = "http://localhost:5173/category";

  test("should switch type of show", async ({ page }) => {
    await page.goto(categoryUrl);

    const categoryHeading = page.getByRole("heading", { name: /Category/i });
    const tvShowButton = page.getByText("TV Show");
    const movieButton = page.getByText("Movie");
    const actionButton = page.getByText("Action");
    const actionAdventureButton = page.getByText("Action & Adventure");

    // Switch to TV Show
    await tvShowButton.click();
    await expect(categoryHeading).toHaveText("Category TV");
    await expect(actionAdventureButton).toBeVisible();

    // Switch back to Movie
    await movieButton.click();
    await expect(categoryHeading).toHaveText("Category Movie");
    await expect(actionButton).toBeVisible();
  });

  test("should redirect to details after clicking an item", async ({
    page,
  }) => {
    await page.goto(categoryUrl);

    const tvShowButton = page.getByText("TV Show");
    const firstItem = page.locator(".mt-5.grid >> a").first();

    // Wait for items to load before interacting
    await firstItem.waitFor();

    // Movie details navigation
    await Promise.all([page.waitForURL(/details.*movie/), firstItem.click()]);

    await page.goBack();

    // Switch to TV show and navigate again
    await tvShowButton.click();
    await firstItem.waitFor();
    await Promise.all([page.waitForURL(/details.*tv/), firstItem.click()]);
  });
});
