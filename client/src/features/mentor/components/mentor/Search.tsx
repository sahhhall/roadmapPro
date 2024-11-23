import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Searchh = ({ onFilterChange }: { onFilterChange: any }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchText(query);
    onFilterChange({ search: query });
  };

  return (
    <div className="flex-1 relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        value={searchText}
        onChange={handleSearch}
        placeholder="Search for any Skill, domain or name..."
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Searchh;
