import Link from "next/link";
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 px-24">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div
          className="
            grid grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-12
          "
        >
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold text-xl">
                A
              </div>
              <span className="text-xl font-semibold text-gray-900">
                APKPure
              </span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mb-6">
              Discover and download the best games and apps for Android. Safe,
              fast, and free.
            </p>

            <div className="flex items-center gap-4 text-gray-400">
              <Facebook className="w-5 h-5 hover:text-gray-700 transition cursor-pointer" />
              <Twitter className="w-5 h-5 hover:text-gray-700 transition cursor-pointer" />
              <Youtube className="w-5 h-5 hover:text-gray-700 transition cursor-pointer" />
              <Instagram className="w-5 h-5 hover:text-gray-700 transition cursor-pointer" />
            </div>
          </div>

          {/* Sections */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Sections</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Games
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-900">
                  contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Topics
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Business Cooperation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  DMCA Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Submit APK
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Developer Console
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Bottom */}
      <div className="py-6 text-center text-sm text-gray-500">
        © 2025 APKPure. All rights reserved.
      </div>
    </footer>
  );
}
