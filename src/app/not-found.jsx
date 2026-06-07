"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-[#0d1117] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* Glow Effect */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl" />
        </div>

        {/* 404 */}
        <h1 className="text-8xl md:text-9xl font-bold text-amber-500 mb-4">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-400 text-lg max-w-lg mx-auto mb-10">
          Looks like you have wandered into a study room that dose not exist.
          The page you are looking for may have been moved or deleted.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-amber-500 text-black font-semibold px-6 py-3 rounded-xl hover:bg-amber-400 transition"
          >
            <Home size={18} />
            Back Home
          </Link>

          
        </div>

        {/* Decorative Card */}
        <div className="mt-16 bg-[#161b22] border border-gray-800 rounded-2xl p-6">
          <p className="text-sm text-gray-500">
            Error Code: 404 • Requested resource could not be found.
          </p>
        </div>
      </div>
    </section>
  );
}