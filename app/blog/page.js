// app/blog/page.js (SERVER)
import { getPostLite } from "@/lib/post";
import LoadMore from "../components/loadMore/page";

export default async function BlogPosts() {
  const allPost = await getPostLite();

  return (
    <div className="flex flex-wrap gap-4">
      <LoadMore initialPost={allPost} />
    </div>
  );
}
