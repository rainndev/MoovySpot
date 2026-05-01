import { BiHistory, BiSolidCategoryAlt } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
import { LuListVideo } from "react-icons/lu";

export const navigationOptions = [
  {
    name: "Home",
    slug: "/",
    icon: GoHomeFill,
  },

  {
    name: "Watchlist",
    slug: "/watchlist",
    icon: LuListVideo,
  },

  {
    name: "Category",
    slug: "/category",
    icon: BiSolidCategoryAlt,
  },

  {
    name: "Recent",
    slug: "/recent",
    icon: BiHistory,
  },
] as const;

export type NavigationSlug = (typeof navigationOptions)[number]["slug"];
