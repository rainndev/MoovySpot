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

type sizeType = "w300" | "w500" | "w1280" | "w780" | "original";

export const formatImagePath = (path: string, size: sizeType) => {
  if (!path) return "";

  // Ensure the path starts with a slash
  if (path.startsWith("/")) {
    return `https://image.tmdb.org/t/p/${size}${path}`;
  } else {
    return `https://image.tmdb.org/t/p/${size}/${path}`;
  }
};

//format watch url

export const formatWatchUrl = (id: number, type: string) => {
  if (!id || !type) return "";

  // Ensure the type is lowercase
  const formattedType = type.toLowerCase();

  return `/watch/${id}?type=${formattedType}`;
};

//format date to time ago

export const getTimeAgo = (dateString: Date): string => {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units: { label: string; seconds: number }[] = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "min", seconds: 60 },
  ];

  for (const unit of units) {
    const interval = Math.floor(seconds / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.label}${interval > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};
