import LoadMore from "../loadMore/page";

export default function TagView({ tag, posts }) {
  const title = tag?.name ?? tag?.slug ?? "Tag";
  const slug = tag?.slug ?? "";
  const safePosts = posts ?? { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } };

  return (
    <section className="max-w-6xl mx-auto pt-20">
      <h1 className="text-2xl font-bold mb-6">Tag: {title}</h1>

      <LoadMore initialPost={safePosts} taxonomy={{ key: "tag", value: slug }} />
    </section>
  );
}
