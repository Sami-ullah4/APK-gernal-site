import { getCategorieSlug } from "@/lib/post";
import Link from "next/link";

export default async function NavBar() {
  const categories = (await getCategorieSlug()) ?? [];

  return (
    <nav className="fixed bg-transparent text-white z-50 p-4 flex gap-4">
      {categories.map((category) => (
        <Link
          key={category?.slug}
          href={`/${category?.slug ?? ""}`}
          className="hover:underline capitalize"
        >
          {category?.name ?? category?.slug ?? "Category"}
        </Link>
      ))}
    </nav>
  );
}
