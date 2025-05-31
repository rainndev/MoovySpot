import { GoHomeFill } from "react-icons/go";
import { LuListVideo } from "react-icons/lu";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BiHistory } from "react-icons/bi";

interface NavigationOption {
  name: string;
  slug: string;
  icon: React.ElementType;
}

export const navigationOptions: NavigationOption[] = [
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
];
