// app/about/page.js
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-5xl font-bold text-center mb-8 text-gray-800">
          About SimpleBlog
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-semibold mb-4 text-blue-600">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            SimpleBlog is dedicated to providing a platform where writers and readers can connect 
            through meaningful stories. We believe everyone has a story to tell, and we&apos;re here to 
            make sharing those stories as simple and enjoyable as possible.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-semibold mb-4 text-blue-600">What We Offer</h2>
          <ul className="space-y-4 text-gray-700 text-lg">
            <li className="flex items-start">
              <span className="text-2xl mr-4">✍️</span>
              <div>
                <strong>Easy Publishing:</strong> Create and publish your blogs with our intuitive 
                interface in just a few clicks.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-4">👥</span>
              <div>
                <strong>Community:</strong> Connect with like-minded readers and writers who share 
                your interests and passions.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-4">🚀</span>
              <div>
                <strong>Modern Platform:</strong> Built with the latest technologies to provide you 
                with a fast, responsive, and reliable experience.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-4">🔒</span>
              <div>
                <strong>Secure:</strong> Your data and content are protected with industry-standard 
                security measures.
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-semibold mb-4 text-blue-600">Our Story</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            SimpleBlog was created by passionate developers who wanted to build a blogging platform 
            that focuses on what matters most - great content and meaningful connections. We built 
            this platform using Next.js and MongoDB to ensure a modern, fast, and scalable experience.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Whether you&apos;re a seasoned writer or just starting your blogging journey, SimpleBlog 
            provides you with all the tools you need to share your voice with the world.
          </p>
        </div>

        <div className="text-center mt-12">
          <a
            href="/register"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition inline-block"
          >
            Join Our Community Today
          </a>
        </div>
      </div>
    </div>
  );
}