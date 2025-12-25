"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "../../store/hooks";
import { setPostsFromClient } from "../../store/slices/postsSlice";
import { ChevronDown } from "lucide-react";


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

  // Keep local state in sync with Redux for the home page
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

      const morePost = await getPostLite(post.pageInfo.endCursor, taxonomyParam);

      setPost((prev) => {
        const nextPost = {
          nodes: [...(prev?.nodes ?? []), ...(morePost?.nodes ?? [])],
          pageInfo: morePost?.pageInfo ?? defaultPageInfo,
        };

        // If we're on the main home feed (no categorySlug / initialPost),
        // also persist appended posts into Redux so they survive navigation.
        if (!categorySlug && !taxonomy && !initialPost) {
          dispatch(
            setPostsFromClient({
              nodes: nextPost.nodes,
              pageInfo: nextPost.pageInfo,
            })
          );
        }

        return nextPost;
      });
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
          const src = item?.featuredImage?.node?.sourceUrl || "/background.jpg";
          const rating =
            item.rating ?? (Math.random() * (4.6 - 4.2) + 4.2).toFixed(1);

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
                  <span className="text-gray-700 text-base">{rating}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Load More / Show Less Button */}
      <div className="w-full mt-8 flex items-center justify-center gap-2">
        <hr className="w-full h-0.5 text-gray-400" />
        <button
          onClick={async () => {
            const canLoadMore = post?.pageInfo?.hasNextPage;
            const hasExtra =
              (post?.nodes?.length ?? 0) > (snapshot.nodes?.length ?? 0);
            const isShowLessState = !canLoadMore && hasExtra;

            if (loading) return;

            // Show Less: revert to initial snapshot
            if (isShowLessState) {
              setPost(snapshot);

              // Persist reverted state to Redux only for the main feed
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

            // Otherwise, try to load more
            if (canLoadMore) {
              await handleLoadMore();
            }
          }}
          disabled={
            loading ||
            (!post.pageInfo?.hasNextPage &&
              (post?.nodes?.length ?? 0) <= (snapshot.nodes?.length ?? 0))
          }
          className="
            text-gray-900 
            disabled:opacity-50
            transition text-nowrap
          "
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
    </>
  );
}
