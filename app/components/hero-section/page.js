"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroSection() {
  const slides = [
    {
      imageUrl: "/background.jpg",
      title: "TikTok",
      rating: "4.5",
      category: "Social",
      company: "TikTok Pte. Ltd.",
      link: "#",
    },
    {
      imageUrl: "/background2.png",
      title: "PUBG Mobile",
      rating: "4.6",
      category: "Games",
      company: "Tencent Games",
      link: "#",
    },
    {
      imageUrl: "/background3.jpeg",
      title: "Instagram",
      rating: "4.4",
      category: "Social",
      company: "Meta",
      link: "#",
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 1, ease: "easeOut" } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const prevSlide = () =>
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);

  return (
      <section className="relative pt-12 w-full overflow-hidden  md:h-[460px]  lg:h-[600px]">
        {slides.map((slide, index) => (
          <AnimatePresence key={index} mode="wait">
            {activeSlide === index && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Background Image */}
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  fill
                  sizes="100vw"
                  className="object-cover w-full h-full"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60 z-5" />

                {/* Text + small image */}
                <div className="absolute inset-0 left-1/6 -bottom-20 flex items-center px-8 md:px-16 z-10 pointer-events-none">
                  <div className="flex items-center gap-6 pointer-events-auto">
                    {/* Small Image */}
                    <div className="w-32 h-32 md:w-40 md:h-40 relative shrink-0 rounded-xl overflow-hidden">
                      <Image
                        src={slide.imageUrl}
                        alt={slide.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Text Content */}
                    <motion.div
                      variants={container}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="text-white max-w-md"
                    >
                      <motion.h2
                        variants={item}
                        className="text-4xl md:text-5xl font-bold mb-3"
                      >
                        {slide.title}
                      </motion.h2>
                      <motion.p
                        variants={item}
                        className="text-base text-gray-300 mb-2"
                      >
                        ⭐ {slide.rating} | {slide.category} | {slide.company}
                      </motion.p>
                      <motion.div variants={item}>
                        <Link
                          href={slide.link}
                          className="inline-flex items-center gap-2 mt-5 bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-xl text-sm font-semibold"
                        >
                          ⬇ Download
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/35 hover:bg-black/50 flex items-center justify-center text-white transition"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/35 hover:bg-black/50 flex items-center justify-center text-white transition"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                activeSlide === index
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </section>
  );
}
