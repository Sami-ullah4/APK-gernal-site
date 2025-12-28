"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const IMAGE_SRC = "/background.jpg";

const posts = [
  {
    slug: "pubg-mobile-mod",
    title: "PUBG Mobile MOD APK",
    excerpt:
      "Download PUBG Mobile MOD APK with unlimited UC, wallhack, and unlocked skins for Android devices.",
  },
  {
    slug: "free-fire-diamond",
    title: "Free Fire Diamond Hack",
    excerpt:
      "Get Free Fire unlimited diamonds with the latest MOD version. 100% safe and working.",
  },
  {
    slug: "gta-5-mobile",
    title: "GTA 5 Mobile Edition",
    excerpt:
      "Experience GTA 5 on mobile with high graphics, offline mode, and full story gameplay.",
  },
  {
    slug: "minecraft-mod",
    title: "Minecraft MOD APK",
    excerpt:
      "Enjoy Minecraft MOD APK with unlimited resources, God mode, and unlocked skins.",
  },
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % posts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveSlide(activeSlide === 0 ? posts.length - 1 : activeSlide - 1);
  };

  const handleNext = () => {
    setActiveSlide((activeSlide + 1) % posts.length);
  };

  return (
    <section className="relative h-[65vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] overflow-hidden top-12">
      {/* Background */}
      {posts.map((post, index) => (
        <Image
          key={post.slug}
          src={IMAGE_SRC}
          alt={post.title}
          fill
          priority
          className={`object-cover transition-opacity duration-700 ${
            index === activeSlide ? "opacity-100 z-0" : "opacity-0 z-0"
          }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="absolute inset-0 z-20 flex flex-col md:flex-row items-center md:justify-start md:pl-20 justify-center px-4 gap-2 ">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={IMAGE_SRC}
            alt={posts[activeSlide].title}
            fill
            className="object-cover"
          />
        </div>
        {/* dasdas */}
        <div className="text-white flex flex-col gap-1 sm:gap-2 text-center md:text-start items-center md:items-start">
          <h1
            className="
    text-gray-300 text-2xl md:text-4xl font-bold
    truncate md:overflow-visible md:whitespace-normal md:truncate-none
    w-48 md:w-auto
  "
          >
            {posts[activeSlide].title}
          </h1>

          <div
            className="
    text-base text-gray-300
    truncate md:overflow-visible md:whitespace-normal md:truncate-none
    w-48 md:w-auto sm:max-w-md
  "
          >
            {posts[activeSlide].excerpt}
          </div>

          <Link
            href={`/${posts[activeSlide].slug}`}
            className="inline-block bg-green-500 hover:bg-green-600 px-7 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold text-sm sm:text-base "
          >
            ⬇ Read More
          </Link>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 text-white p-2 sm:p-3 bg-black/50 rounded-full z-30"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 text-white p-2 sm:p-3 bg-black/50 rounded-full z-30"
      >
        <ChevronRight size={20} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {posts.map((_, index) => (
          <span
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full cursor-pointer transition ${
              index === activeSlide ? "bg-green-500" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
