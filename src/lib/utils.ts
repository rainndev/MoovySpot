import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatRuntime = (minutes: number) => {
  if (typeof minutes !== "number" || minutes < 0) return "Invalid runtime";

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hourLabel = hours === 1 ? "hr" : "hrs";
  const minuteLabel = remainingMinutes === 1 ? "min" : "mins";

  if (hours > 0 && remainingMinutes > 0) {
    return `${hours} ${hourLabel} and ${remainingMinutes} ${minuteLabel}`;
  } else if (hours > 0) {
    return `${hours} ${hourLabel}`;
  } else {
    return `${remainingMinutes} ${minuteLabel}`;
  }
};
