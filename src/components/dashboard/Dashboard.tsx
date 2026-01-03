import {
  Coffee,
  Package,
  Users,
  Receipt,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    {
      title: "Categories",
      count: 5,
      icon: Coffee,
      color: "from-amber-400 to-orange-500",
      link: "/category",
    },
    {
      title: "Products",
      count: 9,
      icon: Package,
      color: "from-emerald-400 to-teal-600",
      link: "/product",
    },
    {
      title: "Bills Today",
      count: 3,
      icon: Receipt,
      color: "from-blue-400 to-indigo-600",
      link: "/bill",
    },
    {
      title: "Users",
      count: 3,
      icon: Users,
      color: "from-purple-400 to-pink-500",
      link: "/user",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-gray-900 dark:via-amber-950 dark:to-rose-950 overflow-x-hidden transition-colors duration-500">
      <main className="pt-20 px-4 sm:px-6 lg:px-8 md:ml-64">
        <div className="max-w-7xl mx-auto mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-amber-100 mb-2">
              Welcome back, <span className="text-amber-600 dark:text-amber-400">Admin</span> ☕
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300">
              Here's what's happening in your cafe today
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, index) => (
              <Link key={stat.title} to={stat.link}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-gray-800/90 rounded-xl shadow-md dark:shadow-2xl border border-gray-100 dark:border-amber-900/50 transition-all duration-300 hover:shadow-lg dark:hover:shadow-amber-900/30"
                >
                  <div className={`h-1.5 bg-gradient-to-r ${stat.color} dark:opacity-90`} />

                  <div className="p-5 text-center">
                    <div
                      className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${stat.color} text-white shadow-md`}
                    >
                      <stat.icon className="h-6 w-6" />
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">
                      {stat.title}
                    </h3>

                    <p className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-amber-100 mb-3">
                      {stat.count}
                    </p>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r ${stat.color} px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-transform hover:scale-105 shadow-md`}
                    >
                      View
                      <TrendingUp className="h-4 w-4" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-14 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="rounded-xl bg-white/80 dark:bg-gray-800/70 backdrop-blur border border-amber-100 dark:border-amber-900/50 p-5 shadow-md dark:shadow-xl"
          >
            <p className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-200">
              <span className="text-amber-600 dark:text-amber-400 font-bold">
                Cafe Bliss
              </span>{" "}
              is running smoothly
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
              Keep brewing excellence — one cup at a time
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;