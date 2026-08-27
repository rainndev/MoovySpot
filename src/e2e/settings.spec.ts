import { expect, test } from "@playwright/test";

test.describe("Settings", () => {
  test("limits the custom cursor setting to desktop", async ({ page }) => {
    await page.goto("/settings");
    await page.evaluate(() => localStorage.removeItem("moovyspot-settings"));
    await page.reload();
    const customCursorSwitch = page.getByRole("switch", {
      name: "Custom cursor",
    });
    const isDesktop = (page.viewportSize()?.width ?? 0) >= 768;

    if (!isDesktop) {
      await expect(customCursorSwitch).toBeVisible();
      await expect(customCursorSwitch).toBeDisabled();
      await expect(customCursorSwitch).toHaveAttribute("aria-checked", "false");
      await expect(page.getByText("Desktop only", { exact: true })).toBeVisible();
      return;
    }

    await expect(customCursorSwitch).toHaveAttribute("aria-checked", "true");
    await expect(page.locator("html")).toHaveClass(/custom-cursor-enabled/);

    await customCursorSwitch.click();
    await expect(customCursorSwitch).toHaveAttribute("aria-checked", "false");
    await expect(page.locator("html")).not.toHaveClass(/custom-cursor-enabled/);
    await expect(page.locator(".popcorn-cursor")).toHaveCount(0);

    await page.waitForFunction(() => {
      const stored = localStorage.getItem("moovyspot-settings");
      return stored !== null &&
        JSON.parse(stored).state.customCursorEnabled === false;
    });
    await page.reload();
    await expect(customCursorSwitch).toHaveAttribute("aria-checked", "false");
  });

  test("toggles Low Power Mode", async ({ page }) => {
    await page.goto("/settings");
    const lowPowerModeSwitch = page.getByRole("switch", {
      name: "Low Power Mode",
    });

    await expect(lowPowerModeSwitch).toHaveAttribute("aria-checked", "false");
    await lowPowerModeSwitch.click();
    await expect(lowPowerModeSwitch).toHaveAttribute("aria-checked", "true");
  });
});
