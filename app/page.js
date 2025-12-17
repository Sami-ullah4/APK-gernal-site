import GamingApss from "./components/gamingApss/page";
import { HeroSection } from "./components/hero-section/page";
import SideBar from "./components/sideBar/page";

export default function Home() {
  return (
    <div className="">
      {" "}
      <HeroSection />
      <div className="flex px-56 bg-[#062442] text-white py-10 gap-2">
        <GamingApss />
        <SideBar />
      </div>
    </div>
  );
}
