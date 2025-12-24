import Image from "next/image";
import styles from "./singlePost.module.css";

export default function PostView({ post }) {
  const safePost = post ?? {};
  const tags = safePost?.tags?.nodes || [];

  const title = safePost?.title ?? "";

  // ✅ Simple image handling (no checks)
  const src = safePost?.featuredImage?.node?.sourceUrl || "/background.jpg";

  const alt = safePost?.featuredImage?.node?.altText || "Post image";

  return (
    <article className={`${styles.singlePost} prose`}>
      <h1>{title}</h1>

      <Image
        src={src}
        alt={alt}
        width={192}
        height={120}
        className="object-cover rounded-md w-40 h-40"
        unoptimized
      />

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: safePost?.content ?? "",
        }}
      />
      {tags.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Tags:</h3>
          <ul className="list-disc list-inside">
            {tags.map((tag) => (
              <li key={tag.id}>{tag.name}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

// ← dynamic routing option
export const dynamicParams = true;
