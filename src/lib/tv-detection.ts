const TV_UA_PATTERN =
  /\b(smart-?tv|hbbtv|web0s|netcast|crkey|roku|nettv|philipstv|viera|dunehd|freebox|googletv|apple ?tv|opera ?tv|tv ?store|inettv|loewe|humax|hisense|vestel|bravia|xbox|playstation|mi(box|tv))/i;

const FIRE_TV_UA_PATTERN = /(?:^|[\s/;(])AFT[A-Z]{0,3}(?=[\s;)]|$)/;

const TOUCH_CAPABLE_TV_PLATFORM_PATTERN = /\b(android ?tv|tizen|web ?os)\b/i;

export function isTVBrowser(): boolean {
  if (typeof window === "undefined") return false;

  const userAgent = navigator.userAgent;

  if (TV_UA_PATTERN.test(userAgent) || FIRE_TV_UA_PATTERN.test(userAgent)) {
    return true;
  }

  const hasTouch =
    navigator.maxTouchPoints > 0 || "ontouchstart" in window;

  if (TOUCH_CAPABLE_TV_PLATFORM_PATTERN.test(userAgent)) {
    return !hasTouch;
  }

  const hasFinePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;
  const largeDisplay = Math.max(screen.width, screen.height) >= 1000;

  return !hasTouch && !hasFinePointer && largeDisplay;
}
