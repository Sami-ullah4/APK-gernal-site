"use client";

import { getCategorieSlug } from "@/lib/post";
import Link from "next/link";
import SearchInput from "../searchInput/page";
import { useEffect, useState } from "react";
import { Home, Menu, Search as SearchIcon, X } from "lucide-react";

export default function NavBar() {
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Fetch categories once
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategorieSlug();
      setCategories(data ?? []);
    };
    fetchCategories();
  }, []);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white/90 backdrop-blur shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 lg:px-8">
        {/* Left: Logo + brand */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600 text-white shadow-sm">
              <Home className="h-5 w-5" />
            </span>
            <span className="hidden flex-col text-left text-sm font-semibold text-gray-900 sm:flex">
              <span>APK Journal</span>
              <span className="text-xs font-normal text-gray-500">
                Latest apps & games
              </span>
            </span>
          </Link>
        </div>

        {/* Center: desktop navigation */}
        <div className="hidden flex-1 items-center justify-center lg:flex">
          <div className="flex max-w-3xl flex-wrap items-center gap-3 text-sm">
            {categories.map((category) => (
              <Link
                key={category?.slug}
                href={`/${category?.slug}`}
                className="rounded-full px-3 py-1 text-gray-600 transition-colors hover:bg-green-50 hover:text-green-700"
              >
                {category?.name ?? "Category"}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: search + mobile toggles */}
        <div className="flex items-center gap-2">
          {/* Desktop search */}
          <div className="hidden md:block">
            <div className="relative flex items-center">
              <SearchInput />
            </div>
          </div>

          {/* Mobile search toggle */}
          <button
            type="button"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:bg-gray-50 md:hidden"
            aria-label="Toggle search"
          >
            <SearchIcon className="h-5 w-5" />
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:bg-gray-50 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      {isSearchOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-3 pt-2 md:hidden">
          <SearchInput />
        </div>
      )}

      {/* Mobile category menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-3 pt-2 lg:hidden">
          <div className="flex flex-wrap gap-2 text-sm">
            {categories.map((category) => (
              <Link
                key={category?.slug}
                href={`/${category?.slug}`}
                className="rounded-full bg-gray-50 px-3 py-1 text-gray-700 transition-colors hover:bg-green-50 hover:text-green-700"
                onClick={() => setIsMenuOpen(false)}
              >
                {category?.name ?? "Category"}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
