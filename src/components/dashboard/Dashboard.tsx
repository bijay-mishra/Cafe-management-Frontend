const Dashboard = () => {
  const stats = [
    { title: 'Category', count: 5, link: '/category' },
    { title: 'Product', count: 9, link: '/product' },
    { title: 'Bill', count: 3, link: '/bill' },
    { title: 'User', count: 3, link: '/user' },
  ];

  return (
    <div className="p-8">
      <div className="flex flex-wrap justify-center gap-8">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-lg shadow-lg w-64 text-center p-6"
          >
            {/* Title */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {stat.title}
            </h3>

            {/* Large Count */}
            <p className="text-5xl font-bold text-gray-900 mb-8">
              {stat.count}
            </p>

            {/* Blue View Button */}
            <a
              href={stat.link}
              className="inline-block bg-blue-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              View {stat.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;