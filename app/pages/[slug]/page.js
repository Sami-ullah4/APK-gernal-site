// import { getAllPageSlugs, getPageBySlug } from "@/lib/pages";

// export async function generateStaticParams() {
//   const pages = await getAllPageSlugs();
//   return pages.map((page) => ({ slug: page.slug }));
// }

// export default async function Page({ params }) {
//   const page = await getPageBySlug(params.slug);
//   if (!page) return <p>Page not found</p>;

//   return (
//     <section className="max-w-4xl mx-auto prose">
//       <h1>{page.title}</h1>
//       <div dangerouslySetInnerHTML={{ __html: page.content }} />
//     </section>
//   );
// }
