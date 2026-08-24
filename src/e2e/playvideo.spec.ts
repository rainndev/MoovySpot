import { expect, test } from "@playwright/test";

test.describe("Play Video Page", () => {
  const moviePlayUrl = "/play/1290879?type=movie";
  const tvPlayUrl = "/play/2190?type=tv&season=1&episode=1";

  test("should show a YouTube-like movie layout with up next content", async ({
    page,
  }) => {
    await page.goto(moviePlayUrl);

    const mainVideo = page.getByTestId("play-main-video");
    const upNextPanel = page.getByTestId("play-up-next");
    const upNextLabel = page.getByTestId("play-up-next-title");

    await expect(mainVideo).toBeVisible({ timeout: 15000 });
    await expect(upNextPanel).toBeVisible();
    await expect(upNextLabel).toHaveText(/Collection|Similar Movies/);
  });

  test("should show tv episodes in the right rail", async ({ page }) => {
    await page.goto(tvPlayUrl);

    const mainVideo = page.getByTestId("play-main-video");
    const upNextPanel = page.getByTestId("play-up-next");
    const upNextLabel = page.getByTestId("play-up-next-title");
    const seasonSelect = page.getByTestId("play-season-select");

    await expect(mainVideo).toBeVisible({ timeout: 15000 });
    await expect(upNextPanel).toBeVisible();
    await expect(upNextLabel).toHaveText("Season 1");
    await expect(seasonSelect).toBeVisible();
    await expect(upNextPanel).toContainText(/Season\s+1/);
  });
});
