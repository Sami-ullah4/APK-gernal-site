import { getCategorieDetal, getCategorieSlug, getPostLite } from "@/lib/post";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function GamingApss() {
  const categories = (await getCategorieSlug()) ?? [];
  const categoryName = categories.find((cat) => cat.slug === "gaming-apps");

  if (!categoryName) {
    notFound();
  }

  const category = await getCategorieDetal(categoryName.categoryName);

  const postsData = await getPostLite(null, {
    key: "categoryName",
    value: categoryName.categoryName,
  });

  if (!postsData?.nodes?.length) {
    notFound();
  }

  const posts = postsData;

  return (
    <div className=" bg-[#062442]">
      <h1 className="text-3xl font-bold text-white pb-10">
        <Link href={`/${categoryName.slug}`}>{categoryName.name}</Link>
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(posts.nodes.slice(0, 8) ?? []).map((item) => {
          const src = item?.featuredImage?.node?.sourceUrl ?? "/background.jpg";

          return (
            <div key={item.slug} className="w-48">
              <Link href={`/${item.slug}`}>
                <Image
                  src={src}
                  alt={item.title}
                  width={192}
                  height={160}
                  className="object-cover w-40 h-40 rounded-2xl"
                  unoptimized
                />
                <h2 className="text-sm font-semibold mt-2 text-white w-40 truncate">
                  {item.title}
                </h2>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
