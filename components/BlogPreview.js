"use client";
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import Link from "next/link";

export default function BlogPreview() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      const data = await response.json();
      
      if (data.success) {
        // শেষের 3টা blog নেয়া
        setBlogs(data.data.slice(-3).reverse());
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Latest Blog Posts
        </h2>
        
        {blogs.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-xl mb-4">No blogs yet! Be the first to write one.</p>
            <Link
              href="/blogs"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
            >
              Create Your First Blog
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/blogs"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
              >
                View All Blogs
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}