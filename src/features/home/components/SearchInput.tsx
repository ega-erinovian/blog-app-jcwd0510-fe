import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface SearchInputProps {
  onSearch: (value: string) => void;
  placeholder?: string;
}

export const SearchInput = ({
  onSearch,
  placeholder = "Search...",
}: SearchInputProps) => {
  const [search, setSearch] = useState("");

  const handleSearch = (value: string) => {
    setSearch(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearch("");
    onSearch("");
  };

  return (
    <div className="relative mx-auto my-8 w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <Input
          className="w-full rounded-full bg-white py-2 pl-10 pr-10 text-base shadow-md transition-shadow duration-200 placeholder:text-gray-400 focus:shadow-lg focus-visible:ring-2 focus-visible:ring-green-500 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          value={search}
        />
        {search && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none dark:text-gray-500 dark:hover:text-gray-300"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};
