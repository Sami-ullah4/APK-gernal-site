"use client";

import { getCategorieSlug } from "@/lib/post";
import Link from "next/link";
import SearchInput from "../searchInput/page";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategorieSlug();
      setCategories(data ?? []);
    };
    fetchCategories();
  }, []);

  return (
    <nav
      className={`bg-white lg:px-40 py-1 fixed top-0 left-0 w-full z-50 flex items-center justify-between transition-all duration-300
        `}
    >
      {/* Categories */}
      <div className="flex gap-4 items-center">
        {/* logo */}
        <div className="text-black">logo</div>

        {categories.map((category) => (
          <Link
            key={category?.slug}
            href={`/${category?.slug}`}
            className="hover:text-green-500 capitalize text-gray-500"
          >
            {category?.name ?? "Category"}
          </Link>
        ))}
      </div>

      {/* Search Input */}
      <div
        className={`relative flex items-center transition-all duration-300 ease-in-out
         
        `}
      >
        <SearchInput />
      </div>
    </nav>
  );
}
