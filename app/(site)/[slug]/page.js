import CategoryView from "@/app/components/categoryView/page";
import PostView from "@/app/components/postView/page";
import { getCategorieDetal, getPostLite, GetSinglePost } from "@/lib/post";
import { notFound } from "next/navigation";

export default async function SlugPage({ params, searchParams }) {
  const { slug } = await params;
  const categoryName = slug.toLowerCase();

  // Unwrap searchParams promise
  const sp = await searchParams;
  const endCursor = sp?.cursor ?? null;

  // 1️⃣ Check if slug is a category
  const category = await getCategorieDetal(categoryName);
  if (category) {
    const postsData = await getPostLite(endCursor, {
      key: "categoryName",
      value: category.categoryName,
    });
    console.log(postsData);

    if (!postsData?.nodes?.length) notFound();

    return <CategoryView category={category} posts={postsData} />;
  }

  // 2️⃣ Else, single post
  const post = await GetSinglePost(slug);
  if (!post) notFound();

  return <PostView post={post} />;
}
