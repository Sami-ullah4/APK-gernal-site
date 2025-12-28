"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "../../store/hooks";
import { setPostsFromClient } from "../../store/slices/postsSlice";
import { ChevronDown } from "lucide-react";

/* =======================
   ⭐ Rating Helpers
======================= */

// Rating always >= 4.0
function getRandomRatingAboveFour() {
  return Number((Math.random() * (5 - 4) + 4).toFixed(1));
}

// Star UI (5 stars, color fill by percentage)
function StarRating({ rating }) {
  const percentage = (rating / 5) * 100;

  return (
    <div className="relative inline-block text-sm leading-none">
      {/* Gray stars */}
      <div className="flex text-gray-300">★★★★★</div>

      {/* Yellow overlay */}
      <div
        className="flex text-yellow-400 absolute top-0 left-0 overflow-hidden"
        style={{ width: `${percentage}%` }}
      >
        ★★★★★
      </div>
    </div>
  );
}

export default function LoadMore({
  posts,
  pageInfo,
  initialPost,
  categorySlug,
  taxonomy,
}) {
  const defaultPageInfo = { hasNextPage: false, endCursor: null };
  const dispatch = useAppDispatch();

  // Snapshot of the initial list for "Show Less"
  const [snapshot, setSnapshot] = useState(() => {
    if (initialPost) {
      return {
        nodes: initialPost.nodes ?? [],
        pageInfo: initialPost.pageInfo ?? defaultPageInfo,
      };
    }
    return {
      nodes: [],
      pageInfo: defaultPageInfo,
    };
  });

  const [post, setPost] = useState(() =>
    initialPost
      ? {
          nodes: initialPost.nodes ?? [],
          pageInfo: initialPost.pageInfo ?? defaultPageInfo,
        }
      : {
          nodes: posts ?? [],
          pageInfo: pageInfo ?? defaultPageInfo,
        }
  );

  const [loading, setLoading] = useState(false);

  // Sync local state with Redux
  useEffect(() => {
    if (!initialPost && posts && pageInfo && snapshot.nodes.length === 0) {
      const base = {
        nodes: posts,
        pageInfo: pageInfo ?? defaultPageInfo,
      };
      setSnapshot(base);
      setPost(base);
    }
  }, [posts, pageInfo, initialPost, snapshot.nodes.length]);

  const handleLoadMore = async () => {
    if (!post?.pageInfo?.hasNextPage || loading) return;
    setLoading(true);

    try {
      const { getPostLite } = await import("@/lib/post");

      const taxonomyParam =
        taxonomy ??
        (categorySlug && categorySlug.length
          ? { key: "categoryName", value: categorySlug }
          : null);

      const morePost = await getPostLite(
        post.pageInfo.endCursor,
        taxonomyParam
      );

      const nextPost = {
        nodes: [...(post?.nodes ?? []), ...(morePost?.nodes ?? [])],
        pageInfo: morePost?.pageInfo ?? defaultPageInfo,
      };

      setPost(nextPost);

      if (!categorySlug && !taxonomy && !initialPost) {
        dispatch(
          setPostsFromClient({
            nodes: nextPost.nodes,
            pageInfo: nextPost.pageInfo,
          })
        );
      }
    } catch (err) {
      console.error("Error loading more posts:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-1 md:px-2 lg:px-28">
      {/* GRID */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-1 md:gap-2">
        {(post?.nodes ?? []).map((item) => {
          const src = item?.featuredImage?.node?.sourceUrl || "/background.jpg";

          const rating = item.rating ?? getRandomRatingAboveFour();

          return (
            <Link key={item.slug} href={`/${item.slug}`} className="group">
              <div
                className=" w-full   lg:p-2 hover:bg-gray-300
                  bg-white rounded-xl p-3
                  flex flex-col items-center
                  shadow-sm
                  transition-all duration-300
                  hover:shadow-xl
                "
              >
                {/* Image */}
                <div
                  className="
                    w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden
                    transition-transform duration-300
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
    text-center
    truncate overflow-hidden whitespace-nowrap
    w-28 sm:w-32 md:w-36 lg:w-32
    transition-colors duration-300
    group-hover:text-green-600
  "
                >
                  {item.title}
                </h2>
                {/* ⭐ Rating */}
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-600">
                  <StarRating rating={rating} />
                  <span>{rating}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Load More / Show Less */}
      <div className="w-full mt-8 flex items-center justify-center gap-2">
        <hr className="w-full h-0.5 text-gray-400" />
        <button
          onClick={async () => {
            const canLoadMore = post?.pageInfo?.hasNextPage;
            const hasExtra =
              (post?.nodes?.length ?? 0) > (snapshot.nodes?.length ?? 0);
            const isShowLessState = !canLoadMore && hasExtra;

            if (loading) return;

            if (isShowLessState) {
              setPost(snapshot);

              if (!categorySlug && !initialPost) {
                dispatch(
                  setPostsFromClient({
                    nodes: snapshot.nodes,
                    pageInfo: snapshot.pageInfo,
                  })
                );
              }
              return;
            }

            if (canLoadMore) {
              await handleLoadMore();
            }
          }}
          disabled={
            loading ||
            (!post.pageInfo?.hasNextPage &&
              (post?.nodes?.length ?? 0) <= (snapshot.nodes?.length ?? 0))
          }
          className="text-gray-900 disabled:opacity-50 transition text-nowrap"
        >
          {loading ? (
            "Loading..."
          ) : !post.pageInfo?.hasNextPage &&
            (post?.nodes?.length ?? 0) > (snapshot.nodes?.length ?? 0) ? (
            <>
              Show less <ChevronDown />
            </>
          ) : post.pageInfo?.hasNextPage ? (
            <>
              Load More <ChevronDown />
            </>
          ) : (
            "All Posts Loaded!"
          )}
        </button>
        <hr className="w-full h-1 text-gray-400" />
      </div>
    </section>
  );
}
