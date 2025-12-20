import BlogPosts from "./blog/page";
import GamingApss from "./components/gamingApss/page";
import HeroSection from "./components/hero-section/page";
import LatestApps from "./components/latestApps/page";
import NewApp from "./components/newApp/page";
import SideBar from "./components/sideBar/page";

export default function Home() {
  return (
    <div className="">
      {" "}
      <HeroSection />
      <div className="flex px-4  lg:px-32 text-white py-10 gap-6">
        <div className="">
          <NewApp />
          <GamingApss />
          <LatestApps />
        </div>
        <SideBar />
      </div>
      <section className="px-36">
        <div className="text-gray-800 text-2xl font-bold py-6">All post</div>
        <BlogPosts />
      </section>
    </div>
  );
}
