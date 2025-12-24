"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SideBar() {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  // Example tags/items
  const items = [
    "sx000",
    "777cx",
    "777xd",
    "cold",
    "happy",
    "funny",
    "music",
    "video",
    "chat",
    "live",
  ];

  return (
    <aside className="lg:sticky flex-[30%] lg:flex gap-4 flex-col   hidden  ">
      <div className="p-5 rounded-lg  bg-white shadow-md text-gray-800">
        {/* Search Input */}
        <div className="relative mb-6 ">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search..."
            className="w-full border bg-green-500 border-gray-300 rounded-md py-2 px-4 pl-10 text-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700"
            size={24}

          />
        </div>
        {/* Sidebar Title */}
        <h2 className="text-lg text-gray-700 font-bold pb-5">Most tranding searches</h2>

        {/* Tags / Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {items.map((item, idx) => (
            <span
              key={idx}
              className="bg-gray-200 text-gray-700 text-base font-medium px-4 py-2 rounded-full cursor-pointer hover:bg-gray-300 transition"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Sidebar Content */}
        <p className="text-base text-gray-600">
          This is the sidebar content. You can add widgets, links, or other
          information here.
        </p>
      </div>
      {/*  */}
      <div className="p-5 rounded-lg bg-white  shadow-md text-gray-800">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro enim
        nostrum error sapiente. Velit placeat error quasi repellat perferendis
        ullam ex voluptatem voluptate unde voluptas. Odio eius ad facilis
        voluptatibus similique tempore odit architecto mollitia commodi,
        inventore expedita eaque nobis?
      </div>
    </aside>
  );
}
