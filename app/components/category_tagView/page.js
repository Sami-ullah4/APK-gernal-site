// components/loadMore/PostCard.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import StarRating from "../ratingStars/page";

export default function PostCard({ post }) {
  const src = post?.featuredImage?.node?.sourceUrl || "/background.jpg";
  const rating = post.rating ?? Number((Math.random() * (5 - 4) + 4).toFixed(1));

  return (
    <Link key={post.slug} href={`/${post.slug}`} className="group">
      <div className="w-full lg:p-2 hover:bg-gray-300
                      bg-white rounded-xl p-3
                      flex flex-col items-center
                      shadow-sm
                      transition-all duration-300
                      hover:shadow-xl">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden
                        transition-transform duration-300
                        group-hover:scale-105">
          <Image
            src={src}
            alt={post.title}
            width={112}
            height={112}
            unoptimized
            className="w-24 h-24 object-cover"
          />
        </div>

        <h2 className="text-base pt-2 font-semibold text-gray-700
                       text-center
                       truncate overflow-hidden whitespace-nowrap
                       w-28 sm:w-32 md:w-36 lg:w-32
                       transition-colors duration-300
                       group-hover:text-green-600">
          {post.title}
        </h2>

        <div className="mt-1 flex items-center gap-2 text-xs text-gray-600">
          <StarRating rating={rating} />
          <span>{rating}</span>
        </div>
      </div>
    </Link>
  );
}
