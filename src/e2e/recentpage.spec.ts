import { expect, test } from "@playwright/test";

test.describe("Recent Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem("recently-view-store");
    });
  });

  test("should add to recent page after viewing a show", async ({ page }) => {
    await page.goto("/details/1290879?type=movie");

    const recentButton = page.getByRole("link", { name: "Recent" });
    const noRecentShowMessage = page.getByRole("heading", { name: "No recently viewed movies/shows" });
    const recentlyViewedHeading = page.getByRole("heading", {
      name: "Recently Viewed",
    });

    await expect(page).toHaveURL(/details\/\d+\?type=movie/);

    await recentButton.click();
    await expect(noRecentShowMessage).not.toBeVisible();
    await expect(recentlyViewedHeading).toBeVisible();
  });

  test("should not duplicate show in recent page after viewing a show twice", async ({
    page,
  }) => {
    await page.goto("/details/1290879?type=movie");

    const recentButton = page.getByRole("link", { name: "Recent" });
    const noRecentShowMessage = page.getByRole("heading", { name: "No recently viewed movies/shows" });
    const recentlyViewedHeading = page.getByRole("heading", {
      name: "Recently Viewed",
    });

    const homePage = page.getByRole("link", { name: "Home" });

    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/details\/\d+\?type=movie/);

    await recentButton.click();
    await expect(noRecentShowMessage).not.toBeVisible();
    await expect(recentlyViewedHeading).toBeVisible();

    await homePage.click();
    await page.goto("/details/1290879?type=movie");
    await expect(page).toHaveURL(/details\/\d+\?type=movie/);

    await recentButton.click();
    await expect(page.locator('a[href^="/details/"]')).toHaveCount(1);
  });

  test("should redirect to details page after cliking show in recent page", async ({
    page,
  }) => {
    await page.goto("/details/1290879?type=movie");

    const recentButton = page.getByRole("link", { name: "Recent" });
    const recentShowItem = page.locator('a[href^="/details/"]').first();

    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/details\/\d+\?type=movie/);

    await recentButton.click();
    await recentShowItem.click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/details\/\d+\?type=movie/);
  });
});
