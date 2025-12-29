"use client";

import { useState, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setPostsFromClient } from "../../store/slices/postsSlice";
import { ChevronDown } from "lucide-react";
import PostCard from "../category_tagView/page";

export default function LoadMore({ posts, pageInfo, initialPost, categorySlug, taxonomy }) {
  const defaultPageInfo = { hasNextPage: false, endCursor: null };
  const dispatch = useAppDispatch();

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
      ? { nodes: initialPost.nodes ?? [], pageInfo: initialPost.pageInfo ?? defaultPageInfo }
      : { nodes: posts ?? [], pageInfo: pageInfo ?? defaultPageInfo }
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!initialPost && posts && pageInfo && snapshot.nodes.length === 0) {
      const base = { nodes: posts, pageInfo: pageInfo ?? defaultPageInfo };
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
        (categorySlug && categorySlug.length ? { key: "categoryName", value: categorySlug } : null);

      const morePost = await getPostLite(post.pageInfo.endCursor, taxonomyParam);

      const nextPost = {
        nodes: [...(post?.nodes ?? []), ...(morePost?.nodes ?? [])],
        pageInfo: morePost?.pageInfo ?? defaultPageInfo,
      };

      setPost(nextPost);

      if (!categorySlug && !taxonomy && !initialPost) {
        dispatch(setPostsFromClient({ nodes: nextPost.nodes, pageInfo: nextPost.pageInfo }));
      }
    } catch (err) {
      console.error("Error loading more posts:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-1 md:px-2 lg:px-28">
      <div className="grid grid-cols-3 md:grid-cols-5 gap-1 md:gap-2">
        {(post?.nodes ?? []).map((item) => (
          <PostCard key={item.slug} post={item} />
        ))}
      </div>

      <div className="w-full mt-8 flex items-center justify-center gap-2">
        <hr className="w-full h-0.5 text-gray-400" />
        <button
          onClick={async () => {
            const canLoadMore = post?.pageInfo?.hasNextPage;
            const hasExtra = (post?.nodes?.length ?? 0) > (snapshot.nodes?.length ?? 0);
            const isShowLessState = !canLoadMore && hasExtra;

            if (loading) return;

            if (isShowLessState) {
              setPost(snapshot);
              if (!categorySlug && !initialPost) {
                dispatch(setPostsFromClient({ nodes: snapshot.nodes, pageInfo: snapshot.pageInfo }));
              }
              return;
            }

            if (canLoadMore) await handleLoadMore();
          }}
          disabled={loading || (!post.pageInfo?.hasNextPage && (post?.nodes?.length ?? 0) <= (snapshot.nodes?.length ?? 0))}
          className="text-gray-900 disabled:opacity-50 transition text-nowrap"
        >
          {loading ? "Loading..." : !post.pageInfo?.hasNextPage && (post?.nodes?.length ?? 0) > (snapshot.nodes?.length ?? 0) ? (
            <>Show less <ChevronDown /></>
          ) : post.pageInfo?.hasNextPage ? (
            <>Load More <ChevronDown /></>
          ) : (
            "All Posts Loaded!"
          )}
        </button>
        <hr className="w-full h-1 text-gray-400" />
      </div>
    </section>
  );
}
