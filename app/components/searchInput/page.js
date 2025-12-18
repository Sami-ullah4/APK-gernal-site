import { Search } from "lucide-react";

export default function SearchInput({ categories }) {
  return (
    <div className="relative mb-6 z-20 ">
      <input
        type="text"
        // value={query}
        // onChange={handleSearch}
        placeholder="Search..."
        className="w-full border bg-[#72bf66] border-gray-300 rounded-full p-2 pl-10 text-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition"
      />
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900"
        size={18}
      />
    </div>
  );
}
