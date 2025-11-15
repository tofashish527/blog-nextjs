// components/Hero.js
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Welcome to SimpleBlog
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Share your stories, connect with readers, and explore amazing content from writers around the world.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/blogs"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Explore Blogs
          </Link>
          <Link
            href="/register"
            className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}