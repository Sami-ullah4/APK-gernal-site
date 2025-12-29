import Image from "next/image";
import styles from "./singlePost.module.css";
import Link from "next/link";

export default function PostView({ post }) {
  const safePost = post ?? {};
  console.log(post);
  const tags = safePost?.tags?.nodes || [];

  const src = safePost?.featuredImage?.node?.sourceUrl || "/background.jpg";
  const alt = safePost?.featuredImage?.node?.altText || "Post image";

  return (
    <article className="flex flex-col gap-6 px-4 md:px-48 md:pt-40">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight mt-4 mb-6">
        {safePost.title}
      </h1>
      <p>
        {new Date(safePost.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      {/* Featured Image */}
      <Image
        src={src}
        alt={alt}
        width={192}
        height={120}
        className="object-cover rounded-md w-40 h-40"
      />

      {/* Post content */}
      <div className={`${styles.singlePost} prose py-8`}>
        <div dangerouslySetInnerHTML={{ __html: safePost?.content ?? "" }} />
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-lg">Tags:</h3>
          <ul className="list-disc list-inside flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/${tag.slug}`}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {tag.name}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

// Dynamic routing option
export const dynamicParams = true;
