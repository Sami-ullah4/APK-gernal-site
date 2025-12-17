"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export function HeroSection() {
  const slides = [
    {
      imageUrl: "/background.jpg",
      link: "https://chatgpt.com/c/693c1793-ffd8-8322-be45-c010190a7068",
      alt: "Lagent Casino - Luxury gaming experience 1",
    },
    {
      imageUrl: "/background2.png",
      link: "https://www.imgonline.com.ua/eng/delete-exif.php",
      alt: "Lagent Casino - Luxury gaming experience 2",
    },
    {
      imageUrl: "/background3.jpeg",
      link: "https://www.imgonline.com.ua/eng/delete-exif.php",
      alt: "Lagent Casino - Luxury gaming experience 3",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative w-full max-h-screen min-h-[490px] md:min-h-[600px]">
      <Image
        src={currentSlide.imageUrl}
        alt={currentSlide.alt}
        fill
        priority
        quality={75}
        className="object-cover object-center transition-opacity duration-1000"
        sizes="100vw"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      {/* Centered text */}
      <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
        <div className="max-w-4xl absolute top-32 border-0">
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl mb-4">
            Lagent Casino
          </h1>
          <p className="text-xl md:text-3xl text-white/90 drop-shadow-lg font-light">
            Where Luxury Meets Fortune
          </p>
        </div>
      </div>

      {/* Dynamic button */}
      <Link
        href={currentSlide.link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-10  right-20 rounded-full z-20 px-6 py-3 text-white font-semibold
             bg-gradient-to-br 
             from-pink-500 
             via-purple-500 
             to-indigo-600
             hover:border-[1px]
             hover:border-white
             "
      >
        Visit Link
      </Link>
    </section>
  );
}

// Provide a default export so Next.js page prerendering recognizes this as a valid component
export default HeroSection;
