export default async function GraphqlRequest(query) {
  const url = "http://localhost/wp-headless/server/graphql";

  const headers = {
    "Content-Type": "application/json",
  };

  // Add token only if exists
  // if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
  //   headers["Authorization"] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  // }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(query),
  });

  const resJson = await res.json();
  return resJson;
}




