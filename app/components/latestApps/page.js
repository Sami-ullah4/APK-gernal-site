import Image from "next/image";
import Link from "next/link";

export default function LatestApps() {
  return (
    <section className="flex-[70%] px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Essential Tools
        </h2>
        <Link
          href="#"
          className="text-green-500 text-sm font-semibold hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1 */}
        <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-black flex items-center justify-center">
            <span className="text-white text-xl font-bold">CC</span>
          </div>

          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900">
              CapCut - Video Editor
            </h3>
            <p className="text-sm text-gray-500">
              Bytedance Pte. Ltd.
            </p>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                Tools
              </span>
              <span className="text-xs text-gray-400">
                130 MB
              </span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-blue-500 flex items-center justify-center">
            <span className="text-white text-xl font-bold">GT</span>
          </div>

          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900">
              Google Translate
            </h3>
            <p className="text-sm text-gray-500">
              Google LLC
            </p>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                Tools
              </span>
              <span className="text-xs text-gray-400">
                25 MB
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
