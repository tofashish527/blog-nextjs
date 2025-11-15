"use client";
import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBlogs();
    // Check if user is logged in
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      const data = await response.json();

      if (data.success) {
        setBlogs(data.data.reverse()); // নতুন blog আগে দেখানোর জন্য
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!formData.title || !formData.content) {
      alert("Please fill in all fields!");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          author: currentUser.name,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Blog created successfully!");
        setFormData({ title: "", content: "" });
        setShowForm(false);
        fetchBlogs(); // Refresh blogs list
      } else {
        alert("Failed to create blog!");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Error creating blog!");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-12 text-gray-800">
          All Blog Posts
        </h1>

        {/* Create Blog Form - শুধু logged in users দেখবে */}
        {currentUser && (
          <div className="max-w-4xl mx-auto mb-12">
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition text-lg"
              >
                ✍️ Write a New Blog
              </button>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Create New Blog</h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕ Close
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Blog Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your blog title"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Blog Content
                    </label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      rows="10"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Write your blog content here..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400"
                  >
                    {submitting ? "Publishing..." : "Publish Blog"}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Blogs List */}
        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-600 mb-4">No blogs yet!</p>
            {!currentUser && (
              <p className="text-gray-500">
                <a href="/login" className="text-blue-600 hover:underline">
                  Login
                </a>{" "}
                to create the first blog post.
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}