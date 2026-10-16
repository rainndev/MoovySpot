import { expect, test } from "@playwright/test";

const RESULTS = [
  {
    id: 1,
    title: "Zulu",
    release_date: "2020-01-01",
    original_language: "en",
    poster_path: "/zulu.jpg",
    popularity: 10,
    vote_average: 9,
  },
  {
    id: 2,
    title: "Alpha",
    release_date: "2010-01-01",
    original_language: "en",
    poster_path: "/alpha.jpg",
    popularity: 90,
    vote_average: 5,
  },
  {
    id: 3,
    title: "Mike",
    release_date: "2015-01-01",
    original_language: "en",
    poster_path: "/mike.jpg",
    popularity: 100,
    vote_average: 7,
  },
];

test.describe("Search sorting", () => {
  test("Ranks by the selected sort and restores relevance order", async ({
    page,
  }) => {
    await page.route("**/search/movie**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          page: 1,
          total_results: RESULTS.length,
          total_pages: 1,
          results: RESULTS,
        }),
      });
    });

    await page.goto("/");

    const searchButton = page.locator(
      '[data-testid="search-button"]:visible, [data-testid="mobile-search-button"]:visible',
    );
    await searchButton.click();

    await page
      .getByRole("textbox", { name: "Search..." })
      .fill("anything", { force: true });

    const titles = () =>
      page.getByTestId("search-result-title").allTextContents();

    await expect(page.getByTestId("search-result-title")).toHaveCount(3);

    // API order is the relevance order.
    expect(await titles()).toEqual(["Zulu", "Alpha", "Mike"]);

    const chooseSort = async (label: string) => {
      await page.getByTestId("search-sort").click();

      // The dropdown must render above the modal overlay, otherwise it is
      // painted behind the backdrop and cannot be seen.
      const popupAboveOverlay = await page.evaluate(() => {
        const wrapper = document.querySelector("[data-slot='select-content']")
          ?.parentElement as HTMLElement | null;
        const overlay = document.querySelector('[role="dialog"]')
          ?.parentElement as HTMLElement | null;
        if (!wrapper || !overlay) return false;
        const z = (el: HTMLElement) => Number(getComputedStyle(el).zIndex) || 0;
        return z(wrapper) > z(overlay);
      });
      expect(popupAboveOverlay).toBe(true);

      await page.getByRole("option", { name: label }).click();
    };

    await chooseSort("Popularity");
    expect(await titles()).toEqual(["Mike", "Alpha", "Zulu"]);

    await chooseSort("Title (A–Z)");
    expect(await titles()).toEqual(["Alpha", "Mike", "Zulu"]);

    await chooseSort("Rating");
    expect(await titles()).toEqual(["Zulu", "Mike", "Alpha"]);

    // Back to the default restores the original API order.
    await chooseSort("Relevance");
    expect(await titles()).toEqual(["Zulu", "Alpha", "Mike"]);
  });
});
