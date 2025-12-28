import { getPostLite } from "@/lib/post";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// ⭐ Random rating generator (server-safe)
function getRandomRating() {
  const rating = (Math.random() * (5 - 4) + 4).toFixed(1); // 4.0 → 5.0
  return { rating: Number(rating) };
}

// ⭐ Star fill renderer (percentage-based)
function StarRating({ rating }) {
  const percentage = (rating / 5) * 100;

  return (
    <div className="relative inline-block text-xs leading-none">
      {/* Gray stars */}
      <div className="flex text-xl text-gray-300">★★★★★</div>

      {/* Yellow stars overlay */}
      <div
        className="flex text-xl text-yellow-400 absolute top-0 left-0 overflow-hidden"
        style={{ width: `${percentage}%` }}
      >
        ★★★★★
      </div>
    </div>
  );
}

export default async function NewApp() {
  const postsData = await getPostLite();
  if (!postsData?.nodes?.length) notFound();

  const posts = postsData.nodes.slice(0, 4);

  return (
    <section className="px-1 py-16 md:px-2 lg:px-28">
      {/* Header */}
      <div className="flex items-center justify-between pb-6">
        <h1 className="text-3xl font-bold text-gray-800">Latest Apps</h1>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-4 gap-2 ">
        {posts.map((item) => {
          const src = item?.featuredImage?.node?.sourceUrl || "/background.jpg";

          const { rating, reviews } = getRandomRating();

          return (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className="group block"
            >
              <div
                className="w-full  p-1 lg:p-2 
                  bg-white rounded-2xl hover:bg-gray-300
                  flex flex-col items-center
                  shadow-sm 
                  transition-all duration-300
                  hover:shadow-xl hover:-translate-y-1
                "
              >
                {/* Image */}
                <div className=" w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden">
                  <Image
                    src={src}
                    alt={item.title}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title */}
                <h2 className="   text-base pt-2 font-semibold text-gray-700
                    text-center truncate w-36 lg:w-32
                    transition-colors duration-300
                    group-hover:text-green-600">
                  {item.title}
                </h2>

                {/* ⭐ Rating */}
                <div className=" flex items-center gap-2 text-lg text-gray-600">
                  <StarRating rating={rating} />
                  <span>{rating}</span>
                </div>

                {/* Download Button */}
                <div className="mt-3 mb-4 w-32 sm:w-36 bg-green-500 rounded-lg py-1.5 transition group-hover:bg-green-600">
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
