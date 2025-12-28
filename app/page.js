import dynamic from "next/dynamic";
import HeroSection from "./components/hero-section/page";
import NewApp from "./components/newApp/page";

const Allpost = dynamic(() => import(`./allposts/page`));
export default async function Home() {
  return (
    <div className="">
      <HeroSection />
      <NewApp />
      <Allpost />
    </div>
  );
}
