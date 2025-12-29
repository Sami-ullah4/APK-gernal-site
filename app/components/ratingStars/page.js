// components/loadMore/StarRating.jsx
"use client";

export default function StarRating({ rating }) {
  const percentage = (rating / 5) * 100;

  return (
    <div className="relative inline-block text-sm leading-none">
      {/* Gray stars */}
      <div className="flex text-gray-300">★★★★★</div>

      {/* Yellow overlay */}
      <div
        className="flex text-yellow-400 absolute top-0 left-0 overflow-hidden"
        style={{ width: `${percentage}%` }}
      >
        ★★★★★
      </div>
    </div>
  );
}
