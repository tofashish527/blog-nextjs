"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function BlogDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchBlog();
    // Check logged in user
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, [params.id]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setBlog(data.data);
      } else {
        alert("Blog not found!");
        router.push("/blogs");
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      alert("Error loading blog!");
      router.push("/blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    setDeleting(true);

    try {
      const response = await fetch(`/api/blogs/${params.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("Blog deleted successfully!");
        router.push("/blogs");
      } else {
        alert("Failed to delete blog!");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Error deleting blog!");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl text-gray-600">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl text-gray-600">Blog not found!</p>
          <Link href="/blogs" className="text-blue-600 hover:underline mt-4 inline-block">
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const canDelete = currentUser && currentUser.name === blog.author;

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/blogs"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          ← Back to All Blogs
        </Link>

        {/* Blog Content */}
        <article className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{blog.title}</h1>

          <div className="flex items-center text-gray-600 mb-6 pb-6 border-b">
            <span className="mr-6">
              👤 <span className="font-semibold">{blog.author}</span>
            </span>
            <span>📅 {formattedDate}</span>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
              {blog.content}
            </p>
          </div>

          {/* Delete Button - শুধু author দেখবে */}
          {canDelete && (
            <div className="mt-8 pt-6 border-t">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:bg-gray-400"
              >
                {deleting ? "Deleting..." : "🗑️ Delete This Blog"}
              </button>
            </div>
          )}
        </article>

        {/* Related Actions */}
        <div className="mt-8 text-center">
          <Link
            href="/blogs"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Read More Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}