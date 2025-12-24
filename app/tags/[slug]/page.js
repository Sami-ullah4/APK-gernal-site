// import { getPostLite, getTagDetail } from "@/lib/post";

// export default async function TagPage({ params }) {
//   const slug = await getTagDetail(params.slug);
//   const tag = slug || null;

//   if (!tag) {
//     return <h1>Tag not found</h1>;
//   }

//   const posts = await getPostLite(null, {
//     key: "tag",
//     value: params.slug,
//   });

//   return (
//     <section className="max-w-5xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">#{tag.name}</h1>

//       {posts.nodes.length === 0 && <p>No posts found for this tag.</p>}

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {posts.nodes.map((post) => (
//           <article key={post.slug}>
//             <h2>{post.title}</h2>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// }
