import { expect, test } from "@playwright/test";

test.describe("Low Power Mode", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.setItem(
        "moovyspot-settings",
        JSON.stringify({
          state: {
            customCursorEnabled: true,
            lowPowerModeEnabled: true,
          },
          version: 1,
        }),
      );
    });
    await page.reload();
  });

  test("uses lightweight homepage visuals", async ({ page }) => {
    await expect(page.locator("canvas")).toHaveCount(0);
    await expect(page.getByRole("region", { name: "Movie gallery" })).toBeVisible();
    await expect(page.getByRole("group", { name: "Drifting wall of tiles" })).toHaveCount(0);
    await expect(page.getByTestId("low-power-backdrop-grid")).toBeVisible();
    await expect(page.getByTestId("hero-search-button")).toHaveCount(0);
    const galleryArrows = page.getByTestId("low-power-gallery-arrows");
    if ((page.viewportSize()?.width ?? 0) >= 768) {
      await expect(galleryArrows).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Previous trending movie" }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Next trending movie" }),
      ).toBeVisible();
    } else {
      await expect(galleryArrows).toHaveCount(0);
    }
  });
});
