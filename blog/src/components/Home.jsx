import React from "react";

function Home() {
  const posts = [
    {
      id: 1,
      title: "Getting Started with React",
      desc: "Learn the basics of React and build modern web apps.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4wwUsLRpmDA5wt2tWnwUGtnZOJhURrkwoyA&s",
    },
    {
      id: 2,
      title: "Mastering JavaScript",
      desc: "Deep dive into JS concepts every developer must know.",
      img: "data:image/png;base64,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",
    },
    {
      id: 3,
      title: "CSS Tricks for Beginners",
      desc: "Make your UI beautiful with simple CSS tricks.",
      img: "data:image/png;base64,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",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-500 to-purple-600 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to BlogApp ✍️</h1>
        <p className="text-lg mb-6">
          Share your ideas, explore articles, and grow your knowledge.
        </p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-200">
          Start Reading
        </button>
      </section>

      {/* Featured Section */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-6">🔥 Featured Posts</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img src={post.img} alt="" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm">{post.desc}</p>
                <button className="mt-4 text-blue-600 font-semibold hover:underline">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Posts */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">📝 Latest Articles</h2>

          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col md:flex-row gap-4 bg-gray-100 p-4 rounded-xl hover:shadow-md transition"
              >
                <img
                  src={post.img}
                  alt=""
                  className="w-full md:w-40 h-28 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                  <p className="text-gray-600 text-sm">{post.desc}</p>
                  <button className="text-blue-600 mt-2 hover:underline">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-10">
        <p>© 2026 BlogApp. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;