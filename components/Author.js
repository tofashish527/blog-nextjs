// components/Author.js
export default function Author() {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-full flex items-center justify-center text-6xl">
            👨‍💻
          </div>
          <h2 className="text-4xl font-bold mb-4">
            About the Platform
          </h2>
          <p className="text-xl mb-6 leading-relaxed">
            SimpleBlog is created to empower writers and readers to connect through meaningful stories. 
            Whether you&apos;re sharing your journey, expertise, or creative writing, this is your space to shine.
          </p>
          <div className="flex justify-center gap-8 text-lg">
            <div>
              <p className="font-bold text-2xl">100+</p>
              <p className="text-gray-200">Writers</p>
            </div>
            <div>
              <p className="font-bold text-2xl">500+</p>
              <p className="text-gray-200">Blogs</p>
            </div>
            <div>
              <p className="font-bold text-2xl">1000+</p>
              <p className="text-gray-200">Readers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}