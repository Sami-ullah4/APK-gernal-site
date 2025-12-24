// import { getAllPageSlugs } from "@/lib/pages";
import { GetSinglePost } from "@/lib/post";
import BlogPosts from "./blog/page";
import HeroSection from "./components/hero-section/page";
import LatestApps from "./components/latestApps/page";
import NewApp from "./components/newApp/page";
import SideBar from "./components/sideBar/page";
// import Link from "next/link";

export default async function Home() {
 

  return (
    <div className="">
      <HeroSection />
      <div className="flex px-4 lg:px-32 text-white py-10 gap-6">
        <div className="">
          <NewApp />
          <LatestApps />
        </div>
        {/* <SideBar /> */}
      </div>
      <section className="px-36">
        <div className="text-gray-800 text-2xl font-bold py-6">All post</div>
        {/* <BlogPosts /> */}
      </section>
      {/* {pages.map((page) => (
        <Link
          href={`/${page.slug}`}
          key={page.slug}
          className="px-36 py-6"
        >
          <h2 className="text-xl font-bold mb-2">{page.slug}</h2>
          <p>Content for {page.slug} page goes here.</p>
        </Link>
      ))} */}
    </div>
  );
}
