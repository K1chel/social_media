import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

export const SearchBar = () => {
  return (
    <div className="relative w-[240px] group hover:cursor-pointer">
      <div className="absolute top-0 flex items-center justify-center w-8 h-full text-muted-foreground group-hover:text-primary">
        <SearchIcon className="w-4 h-4" />
      </div>
      <Input className="px-8 focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 group-hover:bg-secondary cursor-pointer transition" />
      <kbd className="absolute top-[0.6rem] right-[0.6rem] flex items-center gap-x-[2px] justify-center text-muted-foreground group-hover:text-primary pointer-events-none h-5 select-none bg-muted px-1.5 font-mono text-[10px] font-medium rounded-sm">
        <span>⌘</span>
        <span>K</span>
      </kbd>
    </div>
  );
};
