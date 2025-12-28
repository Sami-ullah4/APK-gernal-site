import GraphqlRequest from "./graphqlRequest.js";
export async function getPostLite(endCursor = null, taxonomy = null) {
  const whereParts = ["orderby: { field: DATE, order: DESC }"];

  if (taxonomy && taxonomy.key && taxonomy.value) {
    if (taxonomy.key === "categoryName") {
      whereParts.push(`categoryName: "${taxonomy.value}"`);
    }
    if (taxonomy.key === "categorySlug") {
      whereParts.push(`categorySlugIn: ["${taxonomy.value}"]`);
    }
    if (taxonomy.key === "tag") {
      // Use tagSlugIn array to filter by slug (WPGraphQL expects tagSlugIn)
      whereParts.push(`tagSlugIn: ["${taxonomy.value}"]`);
    }
  }

  const whereString = `where: { ${whereParts.join(", ")} }`;

  const args = [
    `first: 10`,
    endCursor ? `after: "${endCursor}"` : null,
    whereString,
  ]
    .filter(Boolean)
    .join(", ");

  const query = {
    query: `
      query getAllPost {
        posts(${args}) {
          nodes {
            date
            slug
            title
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `,
  };

  const resJson = await GraphqlRequest(query);
  const posts = resJson?.data?.posts ?? null;
  if (!posts) {
    console.warn("getPostLite: no posts returned for taxonomy:", taxonomy, "query:", query.query?.trim()?.slice(0,200));
    return { nodes: [], pageInfo: { endCursor: null, hasNextPage: false } };
  }
  return posts;
}


//////////////////////
export async function GetSinglePost(slug) {
  const query = {
    query: `
      query GetPostBySlug {
        post(id: "${slug}", idType: SLUG) {
          id
          slug
          title(format: RENDERED)
          content
          excerpt(format: RENDERED)
          date
          modified

          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
                sizes {
                  name
                  sourceUrl
                  width
                  height
                }
              }
            }
          }

          categories {
            nodes {
              id
              name
              slug
            }
          }

          tags {
            nodes {
              id
              name
              slug
            }
          }
        }
      }
    `,
  };

  const resJson = await GraphqlRequest(query);
  return resJson?.data?.post || null;
}

////////
export async function getPostSlug() {
  const query = {
    query: `
      query getPostSlugs {
        posts {
          nodes {
            slug
          }
        }
      }
    `,
  };

  const resJson = await GraphqlRequest(query);
  return resJson?.data?.posts?.nodes ?? [];
}
export async function getCategorieSlug() {
  const query = {
    query: `
      query getCategorySlugs {
        categories {
          nodes {
            name
            slug
          }
        }
      }
    `,
  };

  const resJson = await GraphqlRequest(query);
  return resJson?.data?.categories?.nodes ?? [];
}
export async function getCategorieDetal(categoryName) {
  const query = {
    query: `
      query getCategorieDetails {
        category(id: "${categoryName}", idType: SLUG) {
          id
          count
          name
          slug
        }
      }
    `,
  };

  const resJson = await GraphqlRequest(query);
  return resJson?.data?.category ?? null;
}

export async function getTagDetail(slug) {
  const query = {
    query: `
      query GetTagDetail {
        tag(id: "${slug}", idType: SLUG) {
          id
          name
          slug
          count
        }
      }
    `,
  };

  const res = await GraphqlRequest(query);
  return res?.data?.tag ?? null;
}

export async function getTagSlugs() {
  const query = {
    query: `
      query GetTagSlugs {
        tags(first: 8) {
          nodes {
            slug
          }
        }
      }
    `,
  };

  const res = await GraphqlRequest(query);
  return res?.data?.tags?.nodes ?? [];
}
