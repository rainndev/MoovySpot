import { test, expect } from "@playwright/test";

test.describe("Watchlist", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem("watch-list-store");
    });
  });

  test("should add/remove movie to watch list", async ({ page }) => {
    await page.goto("/");

    const favoriteButton = page.getByTestId("favorite-button");
    const watchlistButton = page.getByRole("link", { name: "Watchlist" });
    const numberOFMovieAdded = page.getByText("1 item", { exact: true });
    const NoMovieMessage = page.getByRole("heading", { name: "Please add movies/shows to your watchlist", exact: true });
    const editWatchListButton = page.getByTestId("edit-watchlist");
    const deleteItem = page.getByTestId("delete-item-watchlist");

    await page.getByRole("heading", { name: "Trending Today" }).locator("..").getByRole("link").first().click({ force: true });
    await favoriteButton.click();
    await watchlistButton.click();

    await expect(NoMovieMessage).not.toBeVisible();
    await expect(numberOFMovieAdded).toHaveText("1 item");

    await editWatchListButton.click();

    await expect(deleteItem).toBeVisible();
    await deleteItem.click();

    await expect(NoMovieMessage).toBeVisible();
  });

  test("item should be redirect to play page", async ({ page }) => {
    await page.goto("/");

    const favoriteButton = page.getByTestId("favorite-button");
    const watchlistButton = page.getByRole("link", { name: "Watchlist" });
    const numberOFMovieAdded = page.getByText("1 item", { exact: true });
    const NoMovieMessage = page.getByRole("heading", { name: "Please add movies/shows to your watchlist", exact: true });

    const watchListItem = page.getByTestId("movie-item-watchlist");

    await page.getByRole("heading", { name: "Trending Today" }).locator("..").getByRole("link").first().click({ force: true });
    await favoriteButton.click();
    await watchlistButton.click();

    await expect(NoMovieMessage).not.toBeVisible();
    await expect(numberOFMovieAdded).toHaveText("1 item");

    await Promise.all([
      page.waitForURL(/details.*movie/),
      watchListItem.click(),
    ]);
  });
});
