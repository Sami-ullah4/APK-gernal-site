"use client";

import { useParams } from "next/navigation";
import { useAppSelector } from "../../store/hooks";
import { selectPostBySlug } from "../../store/slices/postsSlice";

export default function SinglePostPage() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const post = useAppSelector((state) => selectPostBySlug(state, slug));

  if (!post) {
    return (
      <section className="px-4 lg:px-32 py-8 text-white">
        <p className="text-gray-300">
          Post not found in the current Redux cache. Navigate from the posts
          list to see cached content.
        </p>
      </section>
    );
  }

  const imageNode = post?.featuredImage?.node;
  const src =
    imageNode && imageNode.sourceUrl ? imageNode.sourceUrl : "/background.jpg";
  const alt = imageNode?.altText || "Post image";

  return (
    <section className="px-4 lg:px-32 py-8 text-white">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-sm text-gray-400 mb-4">
          {post.date && new Date(post.date).toLocaleString()}
        </p>
        <div
          className="w-full h-64 bg-cover bg-center rounded mb-6"
          style={{ backgroundImage: `url(${src})` }}
          role="img"
          aria-label={alt}
        />
        {/* Content from the lite query is not available, so we only render title/meta here */}
        <p className="text-gray-200">
          This post is rendered from the global Redux cache. Navigate back and
          forth between the list and this page without triggering a refetch.
        </p>
      </article>
    </section>
  );
}

