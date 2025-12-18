"use client";

import { getCategorieSlug } from "@/lib/post";
import Link from "next/link";
import SearchInput from "../searchInput/page";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategorieSlug();
      setCategories(data ?? []);
    };

    fetchCategories();
  }, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled((prev) => {
        const isScrolled = window.scrollY > 50;
        return prev !== isScrolled ? isScrolled : prev;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`lg:px-40 fixed top-0 left-0 w-full z-50 flex items-center justify-between transition-all duration-300
          ${scrolled ? "bg-white shadow-md" : "bg-transparent"}
        `}
    >
      <div className="text-white">logo</div>

      <div className="flex gap-4">
        {categories.map((category) => (
          <Link
            key={category?.slug}
            href={`/${category?.slug}`}
            className="hover:underline capitalize text-red-500"
          >
            {category?.name ?? "Category"}
          </Link>
        ))}
      </div>
      {/* SEARCH INPUT */}
      <div
        className={`
    transition-all duration-300 ease-in-out
    ${
      scrolled
        ? "opacity-0 -translate-y-4 pointer-events-none"
        : "opacity-100 translate-y-0"
    }
  `}
      >
        <SearchInput />
      </div>
    </nav>
  );
}
