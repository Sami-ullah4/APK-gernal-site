"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPostLite } from "@/lib/post";

export default function LoadMore({ initialPost, categorySlug }) {
    console.log(`allpost from  blog ${initialPost}`);

  const safeInitial =
    initialPost ?? { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } };
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

      // Append new posts
      setPost((prev) => ({
        nodes: [...(prev?.nodes ?? []), ...(morePost?.nodes ?? [])],
        pageInfo: morePost?.pageInfo ?? { hasNextPage: false, endCursor: null },
      }));
    } catch (err) {
      console.error("Error loading more posts:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {(post?.nodes ?? []).map((item) => {
          const src = item?.featuredImage?.node?.sourceUrl ?? "/background.jpg";
          {
            console.log(
              "Fetching more posts after cursor:",
              post.pageInfo.endCursor
            );
          }
          
          return (
            <div key={item.slug} className="w-48">
              <Link href={`/${item.slug}`}>
                <Image
                  src={src}
                  alt={item.title}
                  width={192}
                  height={160}
                  className="object-cover rounded-md w-40 h-40"
                  unoptimized
                />
                <h2 className="text-sm font-semibold mt-2">{item.title}</h2>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="w-full mt-6 flex justify-center">
        <button
          onClick={handleLoadMore}
          disabled={!post.pageInfo?.hasNextPage || loading}
          className="bg-red-800 text-white px-4 py-2 rounded disabled:opacity-50"
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
