import { test, expect } from "@playwright/test";

test.describe("Details Page", () => {
  const movieUrl = "http://localhost:5173/details/1290879?type=movie";
  const tvShowUrl = "http://localhost:5173/details/2190?type=tv";

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

    const watchEpisodeButton = page.getByRole("button", {
      name: "Watch (S0 - EP1)",
    });

    await Promise.all([
      page.waitForURL(/play.*tv.*season.*episode/),
      watchEpisodeButton.click(),
    ]);

    await expect(page).toHaveURL(/play.*tv.*season.*episode/);
  });

  test("should add/remove to watchlist", async ({ page }) => {
    await page.goto(movieUrl);

    const favoriteButton = page.getByTestId("favorite-button");
    const notificationAdded = page.getByText("Added to Watchlist");
    const notificationRemoved = page.getByText(/Removed from Watchlist/i);

    await favoriteButton.click();
    await expect(notificationAdded).toBeVisible();

    await favoriteButton.click();
    await expect(notificationRemoved).toBeVisible();
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

    await expect(comboBox).toHaveText("Season 1");
  });

  test("should redirect to Play page after clicking episodes list for Tv", async ({
    page,
  }) => {
    await page.goto(tvShowUrl);

    const episodeItem = page.getByRole("link", {
      name: "153783 1 The Spirit Of",
    });

    await Promise.all([
      page.waitForURL(/play.*tv.*season.*episode/),
      episodeItem.click(),
    ]);

    await expect(page).toHaveURL(/play.*tv.*season.*episode/);
  });
});
