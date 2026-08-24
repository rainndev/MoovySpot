import { test, expect } from "@playwright/test";

test.describe("Details Page", () => {
  const movieUrl = "/details/1290879?type=movie";
  const tvShowUrl = "/details/2190?type=tv";

  test("should redirect to Play page after clicking watch now button for Movie", async ({
    page,
  }) => {
    await page.goto(movieUrl);

    const watchNowButton = page.getByRole("button", { name: "Watch Now" });
    await Promise.all([page.waitForURL(/play.*movie/), watchNowButton.click()]);

    await expect(page).toHaveURL(/play.*movie/);
  });

  test("should redirect to Play page after clicking watch episode for TV", async ({
    page,
  }) => {
    await page.goto(tvShowUrl);

    const watchEpisodeLink = page.getByRole("link", {
      name: /Watch \(S\d+ - EP1\)/,
    });

    await expect(watchEpisodeLink).toHaveAttribute(
      "href",
      /\/play\/\d+\?.*type=tv.*season=.*episode=/,
    );
    await page.goto((await watchEpisodeLink.getAttribute("href"))!);

    await expect(page).toHaveURL(/play.*tv.*season.*episode/);
  });

  test("should add/remove to watchlist", async ({ page }) => {
    await page.goto(movieUrl);

    const favoriteButton = page.getByTestId("favorite-button");
    await favoriteButton.click({ force: true });
    await expect(favoriteButton.locator("svg")).toHaveCount(1);

    await favoriteButton.click({ force: true });
    await expect(favoriteButton.locator("svg")).toHaveCount(1);
  });

  test("should show/hide trailer video", async ({ page }) => {
    await page.goto(movieUrl);

    const watchTrailerButton = page.getByRole("button", { name: "Trailer" });
    const trailerVideo = page.getByTestId("trailer-video");
    const trailerBanner = page.getByTestId("trailer-banner");

    //check the inital state
    await expect(trailerBanner).toBeVisible();

    //check if the video trailer shows up after clicking watch trailer
    await watchTrailerButton.click();
    await expect(trailerVideo).toBeVisible();

    //check if the video trailer hidden after clicking watch trailer again
    await watchTrailerButton.click();
    await expect(trailerVideo).not.toBeVisible();
    await expect(trailerBanner).toBeVisible();
  });

  test("should expand dropdown and show selected season for tv seasons", async ({
    page,
  }) => {
    await page.goto(tvShowUrl);

    const comboBox = page.getByRole("combobox");
    const option = page.getByRole("option", { name: "Season 1", exact: true });

    await comboBox.click();
    await option.click();

    await expect(comboBox).toContainText("Season 1");
  });

  test("should redirect to Play page after clicking episodes list for Tv", async ({
    page,
  }) => {
    await page.goto(tvShowUrl);

    const episodeItem = page.locator('a[href*="episode=1"]').first();

    await Promise.all([
      page.waitForURL(/play\/\d+\?.*type=tv/),
      episodeItem.click(),
    ]);

    await expect(page).toHaveURL(/play\/\d+\?.*type=tv/);
  });
});
