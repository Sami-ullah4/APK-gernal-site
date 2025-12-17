import Image from "next/image";
import styles from "./singlePost.module.css";

export default function PostView({ post }) {
  const safePost = post ?? {};
  // avoid accessing properties on undefined during prerender
  const slug = safePost?.slug ?? "";
  const title = safePost?.title ?? "";
  // Safe image check
  const postImage = safePost?.featuredImage?.node;
  let src = "/background.jpg";

  if (
    postImage &&
    typeof postImage.sourceUrl === "string" &&
    postImage.sourceUrl.trim() !== ""
  ) {
    src = postImage.sourceUrl;
  }

  const alt = postImage?.altText || "Post image";

  return (
    <article className={`${styles.singlePost} prose`}>
      <h1>{title}</h1>

      <Image
        src={src}
        alt={alt}
        width={192}
        height={120}
        className="object-cover rounded-md w-40 h-40"
        unoptimized // optional: only for localhost/dev images
      />
      {console.log(safePost?.content)}


      <div className={styles.content} dangerouslySetInnerHTML={{ __html: safePost?.content ?? "" }} />
    </article>
  );
}

// ← dynamic routing option
export const dynamicParams = true;
