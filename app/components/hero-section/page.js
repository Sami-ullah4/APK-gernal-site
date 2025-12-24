"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPostLite } from "@/lib/post";

export default function HeroSection() {
  const [posts, setPosts] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ---------- Fetch Posts ---------- */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPostLite();
        const nodes = res?.nodes || res?.posts?.nodes || [];
        setPosts(nodes.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  /* ---------- Auto Slide ---------- */
  useEffect(() => {
    if (!posts.length) return;

    const interval = setInterval(() => {
      setActiveSlide((p) => (p + 1) % posts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [posts]);

  if (loading) return <div className="h-[60vh] flex items-center justify-center">Loading…</div>;
  if (!posts.length) return null;

  const currentPost = posts[activeSlide];
  const featured =
    currentPost?.featuredImage?.node?.sourceUrl || "/background.jpg";

  return (
    <section className="relative h-[70vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPost.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
        >
          {/* ✅ ACTUAL FEATURED IMAGE */}
          <Image
            src={featured}
            alt={currentPost.title}
            fill
            priority
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 z-10" />

          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center px-8 md:px-20">
            <div className="flex gap-6 max-w-3xl text-white">
              {/* Thumbnail */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden">
                <Image src={featured} alt="" fill className="object-cover" />
              </div>

              <div>
                <h1
                  className="text-4xl md:text-5xl font-bold mb-3"
                  dangerouslySetInnerHTML={{ __html: currentPost.title }}
                />

                <div
                  className="text-gray-300 mb-5 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: currentPost.excerpt }}
                />

                <Link
                  href={`/${currentPost.slug}`}
                  className="inline-block bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-semibold"
                >
                  ⬇ Read More
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button onClick={() => setActiveSlide((p) => (p === 0 ? posts.length - 1 : p - 1))}
        className="nav-btn left-4">
        <ChevronLeft />
      </button>

      <button onClick={() => setActiveSlide((p) => (p + 1) % posts.length)}
        className="nav-btn right-4">
        <ChevronRight />
      </button>

      {/* Thumbnails */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {posts.map((post, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`relative w-14 h-14 rounded-lg overflow-hidden border ${
              activeSlide === index ? "border-white" : "border-white/40"
            }`}
          >
            <Image
              src={post?.featuredImage?.node?.sourceUrl || "/background.jpg"}
              alt=""
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
