import { expect, test } from "@playwright/test";

test.describe("Play Video Page", () => {
  const moviePlayUrl = "http://localhost:5173/play/1290879?type=movie";
  const tvPlayUrl =
    "http://localhost:5173/play/2190?type=tv&season=1&episode=1";

  test("should show a YouTube-like movie layout with up next content", async ({
    page,
  }) => {
    await page.goto(moviePlayUrl);

    const mainVideo = page.getByTestId("play-main-video");
    const upNextPanel = page.getByTestId("play-up-next");
    const upNextLabel = page.getByTestId("play-up-next-label");

    await expect(mainVideo).toBeVisible();
    await expect(upNextPanel).toBeVisible();
    await expect(upNextLabel).toHaveText(/Collection|Similar Movies/);
  });

  test("should show tv episodes in the right rail", async ({ page }) => {
    await page.goto(tvPlayUrl);

    const mainVideo = page.getByTestId("play-main-video");
    const upNextPanel = page.getByTestId("play-up-next");
    const upNextLabel = page.getByTestId("play-up-next-label");
    const seasonSelect = page.getByTestId("play-season-select");

    await expect(mainVideo).toBeVisible();
    await expect(upNextPanel).toBeVisible();
    await expect(upNextLabel).toHaveText("Episodes");
    await expect(seasonSelect).toBeVisible();
    await expect(upNextPanel).toContainText(/Season\s+1/);
  });
});
