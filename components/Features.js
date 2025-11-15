// components/Features.js
export default function Features() {
  const features = [
    {
      icon: "✍️",
      title: "Easy to Write",
      description: "Simple and intuitive interface to create and publish your blogs in minutes."
    },
    {
      icon: "🌐",
      title: "Global Reach",
      description: "Share your stories with readers from around the world instantly."
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Your data is safe with our secure authentication and storage."
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Write and read blogs on any device - desktop, tablet, or mobile."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Why Choose SimpleBlog?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition text-center"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}