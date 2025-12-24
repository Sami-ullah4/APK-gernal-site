"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  fetchPosts,
  selectAllPosts,
  selectPostsStatus,
  selectPostsError,
} from "../store/slices/postsSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function PostsPage() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const status = useAppSelector(selectPostsStatus);
  const error = useAppSelector(selectPostsError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <p className="px-4 py-8 text-gray-200">Loading posts...</p>;
  }

  if (status === "failed") {
    return (
      <p className="px-4 py-8 text-red-500">
        Failed to load posts: {String(error)}
      </p>
    );
  }

  return (
    <section className="px-4 lg:px-32 py-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Posts</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const imageNode = post?.featuredImage?.node;
          const src =
            imageNode && imageNode.sourceUrl
              ? imageNode.sourceUrl
              : "/background.jpg";

          return (
            <article
              key={post.slug}
              className="bg-gray-900 rounded-lg p-4 flex flex-col gap-3"
            >
              <div
                className="w-full h-40 bg-cover bg-center rounded"
                style={{ backgroundImage: `url(${src})` }}
              />
              <h2 className="text-lg font-semibold line-clamp-2">
                <Link href={`/posts/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-gray-400">
                {new Date(post.date).toLocaleDateString()}
              </p>
            </article>
          );
        })}
        {posts.length === 0 && status === "succeeded" && (
          <p className="text-gray-300">No posts found.</p>
        )}
      </div>
    </section>
  );
}


