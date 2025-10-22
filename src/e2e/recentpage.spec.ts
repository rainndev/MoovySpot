import { expect, test } from "@playwright/test";

test.describe("Recent Page", () => {
  test("should add to recent page after viewing a show", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    const firstItem = page.locator(".absolute.inset-0.h-full").first();
    const recentButton = page.getByRole("link").nth(3);
    const noRecentShowMessage = page.getByRole("heading", {
      name: "No recently viewed movies/",
    });
    const recentlyViewedHeading = page.getByRole("heading", {
      name: "Recently Viewed",
    });

    await firstItem.click();
    await expect(page).toHaveURL(/details.*movie/);

    await recentButton.click();
    await expect(noRecentShowMessage).not.toBeVisible();
    await expect(recentlyViewedHeading).toBeVisible();
  });

  test("should not duplicate show in recent page after viewing a show twice", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/");

    const firstItem = page.locator(".absolute.inset-0.h-full").first();
    const recentButton = page.getByRole("link").nth(3);
    const noRecentShowMessage = page.getByRole("heading", {
      name: "No recently viewed movies/",
    });
    const recentlyViewedHeading = page.getByRole("heading", {
      name: "Recently Viewed",
    });

    const homePage = page.getByRole("link").first();

    await firstItem.click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/details.*movie/);

    await recentButton.click();
    await expect(noRecentShowMessage).not.toBeVisible();
    await expect(recentlyViewedHeading).toBeVisible();

    await homePage.click();
    await firstItem.click();
    await expect(page).toHaveURL(/details.*movie/);

    await recentButton.click();
    await expect(page.getByTestId("card-show-image")).toHaveCount(1);
  });

  test("should redirect to details page after cliking show in recent page", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/");

    const firstItem = page.locator(".absolute.inset-0.h-full").first();
    const recentButton = page.getByRole("link").nth(3);
    const recentShowItemImage = page.getByTestId("card-show-image");

    await firstItem.click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/details.*movie/);

    await recentButton.click();
    await recentShowItemImage.click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/details.*movie/);
  });
});
