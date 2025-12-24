import { getPostLite } from "@/lib/post";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function NewApp() {
  const postsData = await getPostLite();
  if (!postsData?.nodes?.length) notFound();

  const posts = postsData.nodes.slice(0, 4);

  return (
    <section className="flex-[70%]">
      {/* Header */}
      <div className="flex items-center justify-between pb-6">
        <h1 className="text-3xl font-bold text-gray-800">Latest Apps</h1>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {posts.map((item) => {
          const src = item?.featuredImage?.node?.sourceUrl || "/background.jpg";

          return (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className="group block "
            >
              <div
                className="
                  bg-white rounded-2xl
                  flex flex-col items-center
                  shadow-sm border border-gray-100
                  transition-all duration-300 ease-out
                  hover:shadow-xl hover:-translate-y-1
                  active:scale-95
                "
              >
                {/* Image */}
                <div
                  className="
                    mt-4 w-24 h-24 sm:w-28 sm:h-28
                    rounded-2xl overflow-hidden
                    transition-transform duration-300
                    group-hover:scale-105
                  "
                >
                  <Image
                    src={src}
                    alt={item.title}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title */}
                <h2
                  className="
                    mt-3 px-2
                    text-sm sm:text-base
                    font-semibold text-gray-700
                    text-center line-clamp-1
                    transition-colors duration-300
                    group-hover:text-green-600
                  "
                >
                  {item.title}
                </h2>

                {/* Download Button */}
                <div
                  className="
                    mt-3 mb-4
                    w-36
                    bg-green-500
                    rounded-lg
                    py-1.5
                    transition-all duration-300
                    group-hover:bg-green-600
                    group-hover:scale-[1.02]
                  "
                >
                  <span className="block text-center text-white text-xs font-semibold">
                    Download
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
