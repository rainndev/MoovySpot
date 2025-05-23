import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWatchTypeStore } from "@/store/WatchTypeStore";

const TypeNavigation = () => {
  const setWatchType = useWatchTypeStore((state) => state.setWatchType);

  return (
    <div className="flex items-center justify-start py-3 text-white md:py-5">
      <Select onValueChange={(value: "movie" | "tv") => setWatchType(value)}>
        <SelectTrigger className="text-logo-white px-5">
          <SelectValue placeholder="Select Type" />
        </SelectTrigger>
        <SelectContent className="bg-logo-black text-logo-white">
          <SelectItem value="movie">Movie</SelectItem>
          <SelectItem value="tv">TV Show</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TypeNavigation;
