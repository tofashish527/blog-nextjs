// app/page.js
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import BlogPreview from "@/components/BlogPreview";
import Author from "@/components/Author";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Features />
      <BlogPreview />
      <Author />
    </div>
  );
}