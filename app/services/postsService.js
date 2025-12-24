import { getPostLite } from "@/lib/post";

// Service layer for posts-related API calls
export async function fetchPostsApi() {
  const data = await getPostLite();

  const nodes = data?.nodes ?? data?.posts?.nodes ?? [];
  const pageInfo =
    data?.pageInfo ?? data?.posts?.pageInfo ?? {
      endCursor: null,
      hasNextPage: false,
    };

  return {
    nodes: nodes.map((post) => ({ ...post })),
    pageInfo,
  };
}

