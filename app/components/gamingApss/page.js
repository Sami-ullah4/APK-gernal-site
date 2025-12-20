import { getCategorieDetal, getCategorieSlug, getPostLite } from "@/lib/post";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";

export default async function GamingApss() {
  const categories = (await getCategorieSlug()) ?? [];
  const categoryName = categories.find((cat) => cat.slug === "gaming-apps");

  if (!categoryName) notFound();

  const postsData = await getPostLite(null, {
    key: "categoryName",
    value: categoryName.categoryName,
  });

  if (!postsData?.nodes?.length) notFound();

  const posts = postsData.nodes.slice(0, 10);

  return (
    <section className="flex-[70%] pt-16 ">
      {/* Header */}
      <div className="flex items-center justify-between pb-10">
        <h1 className="text-3xl font-bold text-gray-800 ">
          {categoryName.name}
        </h1>

        {/* More Button */}
        <Link
          href={`/${categoryName.slug}`}
          className="flex items-center gap-2 text-sm font-semibold text-green-600 transition"
        >
          View more
          <ChevronDown size={20} strokeWidth={3} />{" "}
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 ">
        {posts.map((item) => {
          const src = item?.featuredImage?.node?.sourceUrl || "/background.jpg";
          const rating =
            item.rating ?? (Math.random() * (4.6 - 4.2) + 4.2).toFixed(1);

          return (
            <Link key={item.slug} href={`/${item.slug}`} className="group">
              <div
                className="
              bg-white rounded-xl p-3
              flex flex-col items-center
              shadow-sm
              transition-all duration-300
              hover:shadow-xl
            "
              >
                {/* Image wrapper (important) */}
                <div
                  className="w-24 h-24 rounded-2xl overflow-hidden   transition-transform duration-300 ease-out
                    group-hover:scale-105"
                >
                  <Image
                    src={src}
                    alt={item.title}
                    width={112}
                    height={112}
                    unoptimized
                    className="
                    w-24 h-24 object-cover "
                  />
                </div>

                {/* Title */}
                <h2
                  className="
                  text-base pt-2 font-semibold text-gray-700 text-center truncate md:w-36 lg:w-32
                  transition-colors duration-300
                  group-hover:text-green-600
                "
                >
                  {item.title}
                </h2>

                {/* Rating */}
                <div className="flex items-center  gap-1">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span
                    className="
                    text-gray-700 text-base
                    transition-colors duration-300
                    "
                  >
                    {rating}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
