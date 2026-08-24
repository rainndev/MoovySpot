import { expect, test } from "@playwright/test";

test.describe("Search Movie", () => {
  test("Should switch type of show", async ({ page }) => {
    await page.route("**/search/movie**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          page: 1,
          total_results: 1,
          total_pages: 1,
          results: [{ id: 20, title: "Naruto", release_date: "2002-01-01", original_language: "ja", poster_path: "/naruto.jpg" }],
        }),
      });
    });
    await page.route("**/search/tv**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          page: 1,
          total_results: 1,
          total_pages: 1,
          results: [{ id: 20, name: "Naruto", first_air_date: "2002-01-01", original_language: "ja", poster_path: "/naruto.jpg" }],
        }),
      });
    });
    await page.goto("/");

    const searchButton = page.getByTestId("search-button");
    const searchInput = page.getByRole("textbox", { name: "Search..." });
    const noResultText = page.getByText("No results found", { exact: true });
    const narutoMovieSearchItem = page.getByRole("link").filter({ hasText: "Naruto" }).first();

    const narutoTvSearchItem = page.getByRole("link").filter({ hasText: "Naruto" }).first();
    const tvShowButton = page.getByText("TV", { exact: true });

    await searchButton.click();

    await searchInput.fill("Naruto", { force: true });
    await expect(narutoMovieSearchItem).toBeVisible({ timeout: 15000 });
    await expect(noResultText).not.toBeVisible();

    await tvShowButton.click();
    await expect(narutoTvSearchItem).toBeVisible({ timeout: 15000 });
  });
});
