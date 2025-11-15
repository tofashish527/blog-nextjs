"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // localStorage থেকে current user check করা
    const user = localStorage.getItem("currentUser");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("currentUser");
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    router.push("/");
    router.refresh();
  };

  // Loading state এ শুধু skeleton show করা
  if (isLoading) {
    return (
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              SimpleBlog
            </Link>
            <div className="hidden md:flex space-x-6 items-center">
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            SimpleBlog
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
              About
            </Link>
            <Link href="/blogs" className="text-gray-700 hover:text-blue-600 transition">
              Blogs
            </Link>

            {/* Auth Links */}
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  Welcome, <span className="font-semibold">{currentUser.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  href="/login"
                  className="text-blue-600 px-4 py-2 border border-blue-600 rounded hover:bg-blue-50 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition py-2">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition py-2">
                About
              </Link>
              <Link href="/blogs" className="text-gray-700 hover:text-blue-600 transition py-2">
                Blogs
              </Link>
              {currentUser ? (
                <>
                  <span className="text-gray-700 py-2">
                    Welcome, <span className="font-semibold">{currentUser.name}</span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-blue-600 px-4 py-2 border border-blue-600 rounded hover:bg-blue-50 transition text-center"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-center"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}