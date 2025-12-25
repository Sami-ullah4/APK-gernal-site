import { getCategorieSlug } from "@/lib/post";
import Link from "next/link";
import SearchInput from "../searchInput/page";
import { Home } from "lucide-react";

export default async function NavBar() {
  const categories = (await getCategorieSlug()) ?? [];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white/90 backdrop-blur shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 lg:px-8">
        {/* Left: Logo */}
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

        {/* Center: Categories */}
        <div className="hidden flex-1 items-center justify-center lg:flex">
          <div className="flex flex-wrap items-center gap-3 text-sm">
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

        {/* Right: Search (static render) */}
        <div className="hidden md:block">
          <SearchInput />
        </div>
      </div>
    </nav>
  );
}
