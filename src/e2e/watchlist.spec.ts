import { test, expect } from "@playwright/test";

test.describe("Watchlist", () => {
  test("should add/remove movie to watch list", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    const movie = page.locator(".absolute.inset-0.h-full").first();
    const favoriteButton = page.getByTestId("favorite-button");
    const watchlistButton = page.getByRole("link").nth(1);
    const numberOFMovieAdded = page.getByText("item");
    const NoMovieMessage = page.getByRole("heading", {
      name: "Please add movies/shows to your watchlist",
      exact: true,
    });
    const editWatchListButton = page.getByTestId("edit-watchlist");
    const deleteItem = page.getByTestId("delete-item-watchlist");

    await movie.click();
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
    await page.goto("http://localhost:5173/");

    const movie = page.locator(".absolute.inset-0.h-full").first();
    const favoriteButton = page.getByTestId("favorite-button");
    const watchlistButton = page.getByRole("link").nth(1);
    const numberOFMovieAdded = page.getByText("item");
    const NoMovieMessage = page.getByRole("heading", {
      name: "Please add movies/shows to your watchlist",
      exact: true,
    });

    const watchListItem = page.getByTestId("movie-item-watchlist");

    await movie.click();
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
