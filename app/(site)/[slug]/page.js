import CategoryView from "@/app/components/categoryView/page";
import TagView from "@/app/components/tagView/page";
import PostView from "@/app/components/postView/page";
import { getPostLite, GetSinglePost, getTagDetail, getCategorieDetal } from "@/lib/post";
import { notFound } from "next/navigation";
export default async function SlugPage({ params, searchParams }) {
  const { slug } = await params;
  const sp = await searchParams;
  const endCursor = sp?.cursor ?? null;

  // 1️⃣ Check category
  const category = await getCategorieDetal(slug);
  if (category) {
    const posts = await getPostLite(endCursor, { key: "categoryName", value: slug });
    return <CategoryView category={category} posts={posts} />;
  }

  // 2️⃣ Check tag
  const tag = await getTagDetail(slug);
  if (tag) {
    const posts = await getPostLite(endCursor, { key: "tag", value: slug });
    return <TagView tag={tag} posts={posts} />;
  }

  // 3️⃣ Single post fallback
  const post = await GetSinglePost(slug);
  if (!post) notFound();
  return <PostView post={post} />;
}
