import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const TypeNavigation = () => {
  const [category, setCategory] = useState("movie");

  console.log(category);
  return (
    <div className="flex items-center justify-start py-3 text-white md:py-5">
      <Select onValueChange={(value) => setCategory(value)}>
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
