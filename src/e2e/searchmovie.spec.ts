import { expect, test } from "@playwright/test";

test.describe("Search Movie", () => {
  test("Should switch type of show", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    const searchButton = page.getByTestId("search-button");
    const searchInput = page.getByRole("textbox", { name: "Search..." });
    const noResultText = page.getByText("No results found", { exact: true });
    const narutoMovieSearchItem = page.getByRole("link", {
      name: "Naruto Naruto 2002 Language:",
    });

    const narutoTvSearchItem = page.getByRole("link", {
      name: "Naruto 2002 Language: JA",
    });
    const tvShowButton = page.getByText("TV", { exact: true });

    await searchButton.click();

    await searchInput.fill("Naruto");
    await expect(narutoMovieSearchItem).toBeVisible();
    await expect(noResultText).not.toBeVisible();

    await tvShowButton.click();
    await expect(narutoTvSearchItem).toBeVisible();
  });
});
