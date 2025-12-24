export default async function GraphqlRequest(query) {
  const url = "https://3pattigoldgamer.me/graphql";

  const headers = {
    "Content-Type": "application/json",
  };

  // Add token only if exists
  // if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
  //   headers["Authorization"] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  // }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(query),
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error(`GraphQL request failed: ${res.status} ${res.statusText}`);
      console.error(txt.slice(0, 1000));
      return null;
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const txt = await res.text();
      console.error("GraphQL response is not JSON:", txt.slice(0, 1000));
      return null;
    }

    const resJson = await res.json();
    return resJson;
  } catch (err) {
    console.error("GraphQL request error:", err);
    return null;
  }
}
