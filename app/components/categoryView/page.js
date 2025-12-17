import LoadMore from "../loadMore/page";

export default function CategoryView({ category, posts }) {
  const title = category?.name ?? category?.slug ?? "Category";
  const slug = category?.slug ?? "";
  const safePosts = posts ?? { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } };

  return (
    <section className="max-w-6xl mx-auto pt-20">
      <h1 className="text-2xl font-bold mb-6">Category: {title}</h1>

      <LoadMore initialPost={safePosts} categorySlug={slug} />
    </section>
  );
}
