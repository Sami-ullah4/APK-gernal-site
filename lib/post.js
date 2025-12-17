import GraphqlRequest from "./graphqlRequest";

export async function getPostLite(endCursor = null, taxonomy = null) {
  const whereParts = ["orderby: {field: DATE, order: DESC}"];

  if (taxonomy && taxonomy.key && taxonomy.value) {
    if (taxonomy.key === "categoryName") {
      whereParts.push(`categoryName: "${taxonomy.value}"`);
    } else {
      whereParts.push(`${taxonomy.key}: "${taxonomy.value}"`);
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
              node { sourceUrl altText }
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
  const posts = resJson?.data?.posts;

  // Ensure pageInfo always exists
  return posts ?? { nodes: [], pageInfo: { endCursor: null, hasNextPage: false } };
}


export async function GetSinglePost(slug) {
  const query = {
    query: `
        query GetPostSlug {
                    post(id: "${slug}", idType: SLUG) {
                        content
                        date
                        excerpt(format: RENDERED)
                        modified
                        slug
                        title(format: RENDERED)
                        featuredImage {
                        node {
                            sourceUrl
                            mediaDetails {
                            sizes {
                                sourceUrl
                                height
                            }
                            width
                            }
                            }
                            }
                            categories {
                            nodes {
                                name
                                slug
                            }
                            }
                        }
                        }

        `,
  };
  const resJson = await GraphqlRequest(query);
  const singlePost = resJson?.data?.post || [];

  return singlePost;
}

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
