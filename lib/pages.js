import GraphqlRequest from "./graphqlRequest";

export async function getPageBySlug(slug) {
  const query = {
    query: `
      query GetPageBySlug($slug: ID!) {
        page(id: $slug, idType: URI) {
          id
          title
          content
          slug
          excerpt(format: RENDERED)
          seo {
            title(format: RENDERED)
            metaDesc
          }
        }
      }
    `,
    variables: { slug },
  };

  const res = await GraphqlRequest(query);
  return res?.data?.page ?? null;
}


export async function getAllPageSlugs() {
  const query = {
    query: `
      query GetAllPageSlugs {
        pages(first: 100) {
          nodes {
            slug
            title
          }
        }
      }
    `,
  };

  const res = await GraphqlRequest(query);
  return res?.data?.pages?.nodes ?? [];
}


















export async function getTagDetail(tagSlug) {
  const query = {
    query: `
      query getTagDetail {
        tag(id: "${tagSlug}", idType: SLUG) {
          id
          name
          slug
          count
        }
      }
    `,
  };

  const resJson = await GraphqlRequest(query);
  return resJson?.data?.tag ?? null;
}

export async function getTagSlugs() {
  const query = {
    query: `
      query GetTagSlugs {
        tags(first: 100) {
          nodes {
            slug
          }
        }
      }
    `,
  };

  const resJson = await GraphqlRequest(query);
  return resJson?.data?.tags?.nodes ?? [];
}
