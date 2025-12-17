"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SideBar() {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    console.log("Searching for:", e.target.value);
  };

  // Example tags/items
  const items = ["sx000", "777cx", "777xd", "cold"];

  return (
    <aside className="w-full max-w-xs p-5 rounded-lg bg-white shadow-md text-gray-800">
      
      {/* Search Input */}
      <div className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search..."
          className="w-full border border-gray-300 rounded-full py-3 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      </div>

      {/* Tags / Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {items.map((item, idx) => (
          <span
            key={idx}
            className="bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1 rounded-full cursor-pointer hover:bg-gray-300 transition"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Sidebar Title */}
      <h2 className="text-lg font-bold mb-2">Sidebar</h2>
      
      {/* Sidebar Content */}
      <p className="text-sm text-gray-600">
        This is the sidebar content. You can add widgets, links, or other information here.
      </p>

    </aside>
  );
}
