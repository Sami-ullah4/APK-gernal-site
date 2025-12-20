"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPostLite } from "@/lib/post";

export default function LoadMore({ initialPost, categorySlug }) {
  const safeInitial =
    initialPost ?? {
      nodes: [],
      pageInfo: { hasNextPage: false, endCursor: null },
    };

  const [post, setPost] = useState(safeInitial);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = async () => {
    if (!post?.pageInfo?.hasNextPage || loading) return;
    setLoading(true);

    try {
      const morePost = await getPostLite(post.pageInfo.endCursor, {
        key: "categoryName",
        value: categorySlug,
      });

      setPost((prev) => ({
        nodes: [...(prev?.nodes ?? []), ...(morePost?.nodes ?? [])],
        pageInfo: morePost?.pageInfo ?? {
          hasNextPage: false,
          endCursor: null,
        },
      }));
    } catch (err) {
      console.error("Error loading more posts:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ GRID MATCHED */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {(post?.nodes ?? []).map((item) => {
          const src =
            item?.featuredImage?.node?.sourceUrl || "/background.jpg";
          const rating =
            item.rating ??
            (Math.random() * (4.6 - 4.2) + 4.2).toFixed(1);

          return (
            <Link key={item.slug} href={`/${item.slug}`} className="group">
              {/* ✅ CARD MATCHED */}
              <div
                className="
                  bg-white rounded-xl p-3
                  flex flex-col items-center
                  shadow-sm
                  transition-all duration-300
                  hover:shadow-xl
                "
              >
                {/* Image wrapper */}
                <div
                  className="
                    w-24 h-24 rounded-2xl overflow-hidden
                    transition-transform duration-300 ease-out
                    group-hover:scale-105
                  "
                >
                  <Image
                    src={src}
                    alt={item.title}
                    width={112}
                    height={112}
                    unoptimized
                    className="w-24 h-24 object-cover"
                  />
                </div>

                {/* Title */}
                <h2
                  className="
                    text-base pt-2 font-semibold text-gray-700
                    text-center truncate md:w-36 lg:w-32
                    transition-colors duration-300
                    group-hover:text-green-600
                  "
                >
                  {item.title}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="text-gray-700 text-base">
                    {rating}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Load More Button (unchanged logic) */}
      <div className="w-full mt-8 flex justify-center">
        <button
          onClick={handleLoadMore}
          disabled={!post.pageInfo?.hasNextPage || loading}
          className="
            bg-red-800 text-white px-6 py-2 rounded-lg
            disabled:opacity-50
            transition
          "
        >
          {loading
            ? "Loading..."
            : post.pageInfo?.hasNextPage
            ? "Load More"
            : "No More Posts"}
        </button>
      </div>
    </>
  );
}
