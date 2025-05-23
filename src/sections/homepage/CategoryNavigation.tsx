import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const CategoryNavigation = () => {
  const [category, setCategory] = useState("movie");

  console.log(category);
  return (
    <div className="flex items-center justify-start py-4 text-white">
      <Select onValueChange={(value) => setCategory(value)}>
        <SelectTrigger className="px-10 text-white">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent className="bg-logo-black text-white">
          <SelectItem value="movie">Movie</SelectItem>
          <SelectItem value="tv">TV Show</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryNavigation;
