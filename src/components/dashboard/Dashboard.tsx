import {
  Coffee,
  Package,
  Users,
  Receipt,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const stats = [
    {
      title: 'Categories',
      count: 5,
      icon: Coffee,
      color: 'from-amber-400 to-orange-500',
      hover: 'hover:shadow-amber-200',
      link: '/category',
    },
    {
      title: 'Products',
      count: 9,
      icon: Package,
      color: 'from-emerald-400 to-teal-600',
      hover: 'hover:shadow-emerald-200',
      link: '/product',
    },
    {
      title: 'Bills Today',
      count: 3,
      icon: Receipt,
      color: 'from-blue-400 to-indigo-600',
      hover: 'hover:shadow-blue-200',
      link: '/bill',
    },
    {
      title: 'Users',
      count: 3,
      icon: Users,
      color: 'from-purple-400 to-pink-500',
      hover: 'hover:shadow-purple-200',
      link: '/user',
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-12 px-6">
      <main className="pt-32 px-6">
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          Welcome back, <span className="text-amber-600">Admin</span> ☕
        </h1>
        <p className="text-xl text-gray-600">
          Here's what's happening in your cafe today
        </p>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Link
              key={stat.title}
              to={stat.link}
              className="group block"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`
                  relative overflow-hidden rounded-3xl bg-white 
                  shadow-xl ${stat.hover} 
                  border border-gray-100
                  transition-all duration-500 transform
                  group-hover:scale-105
                `}
              >
                <div className={`h-2 bg-gradient-to-r ${stat.color}`} />
                <div className="p-8 text-center">
                  <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg mb-6`}>
                    <stat.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {stat.title}
                  </h3>
                  <p className="text-6xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-6">
                    {stat.count}
                  </p>
                  <span className={`
                    inline-flex items-center gap-2 text-lg font-semibold 
                    bg-gradient-to-r ${stat.color} text-white 
                    px-8 py-4 rounded-2xl 
                    shadow-lg 
                    transition-all duration-300
                    group-hover:shadow-2xl group-hover:scale-110
                  `}>
                    View {stat.title}
                    <TrendingUp className="w-5 h-5" />
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 text-center">
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-amber-100">
          <p className="text-2xl font-medium text-gray-700">
            <span className="text-amber-600 font-bold">Cafe Bliss</span> is running smoothly
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Keep brewing excellence — one cup at a time
          </p>
        </div>
      </div>
      </main>
    </div>
  );
};

export default Dashboard;