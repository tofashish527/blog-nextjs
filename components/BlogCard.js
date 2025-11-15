// components/BlogCard.js
import Link from "next/link";

export default function BlogCard({ blog }) {
  // Date format করা
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-gray-800 hover:text-blue-600 transition">
          <Link href={`/blogs/${blog._id}`}>
            {blog.title}
          </Link>
        </h3>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span className="mr-4">👤 {blog.author}</span>
          <span>📅 {formattedDate}</span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {blog.content}
        </p>
        <Link
          href={`/blogs/${blog._id}`}
          className="text-blue-600 font-semibold hover:text-blue-800 transition"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}