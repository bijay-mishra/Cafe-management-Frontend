import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Add framer-motion for animations
import LoginModal from '../modals/LoginModal';
import SignupModal from '../modals/SignupModal';
import ForgotPasswordModal from '../modals/ForgotPasswordModal';
import AdminDashboard from '../admin/AdminDashboard';

const LandingPage = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [showForgot, setShowForgot] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn') === 'true';
        setIsLoggedIn(loggedIn);
    }, []);

    const handleLoginSuccess = () => {
        setShowLogin(false);
        setIsLoggedIn(true);
        localStorage.setItem('loggedIn', 'true');
    };

    if (isLoggedIn) {
        return <AdminDashboard />;
    }
    const handleRequireLogin = () => {
    setShowLogin(true);
};

    const bestSellers = [
        { id: 1, title: "Pizza", icon: "🍕", description: "Hand-tossed perfection with fresh mozzarella & San Marzano tomatoes" },
        { id: 2, title: "Coffee", icon: "☕", description: "Single-origin Arabica, expertly brewed for rich flavor" },
        { id: 3, title: "Burger", icon: "🍔", description: "Premium beef patty, brioche bun, secret house sauce" },
        { id: 4, title: "Veg Sandwich", icon: "🥪", description: "Artisan bread with grilled veggies & herb aioli" },
        { id: 5, title: "French Fries", icon: "🍟", description: "Triple-cooked, crispy outside, fluffy inside" },
        { id: 6, title: "Cake & Pastry", icon: "🍰", description: "Daily fresh bakes from our in-house patisserie" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
            <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-md z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="text-4xl">☕</span>
                        <h1 className="text-2xl font-bold text-gray-800">Cafe Bliss</h1>
                    </div>
                    <nav className="flex items-center gap-8">
                        <button
                            onClick={() => setShowLogin(true)}
                            className="text-gray-700 hover:text-amber-600 font-medium transition"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setShowSignup(true)}
                            className="px-6 py-2.5 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition shadow-lg"
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={() => setShowForgot(true)}
                            className="text-gray-600 hover:text-gray-900 text-sm transition"
                        >
                            Forgot Password?
                        </button>
                    </nav>
                </div>
            </header>
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: 'url(/images/cafe-banner.jpg)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-white text-center px-6 max-w-4xl"
                >
                    <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                        Welcome to <span className="text-amber-400">Cafe Bliss</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 opacity-90">
                        Where every sip and bite tells a story of passion and perfection
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button 
                        onClick={handleRequireLogin}
                        className="px-10 py-4 bg-amber-500 text-white text-lg font-semibold rounded-full hover:bg-amber-600 transition transform hover:scale-105 shadow-2xl">
                            Explore Menu
                        </button>
                        <button 
                        onClick={handleRequireLogin}
                        className="px-10 py-4 bg-white/20 backdrop-blur border-2 border-white text-white text-lg font-semibold rounded-full hover:bg-white/30 transition">
                            Order Online
                        </button>
                    </div>
                </motion.div>
            </section>
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold text-gray-800 mb-4">
                        Our <span className="text-amber-600">Best Sellers</span>
                    </h2>
                    <p className="text-xl text-gray-600">Customer favorites that keep them coming back</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {bestSellers.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="h-80 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center relative overflow-hidden">
                                <span className="text-9xl transform group-hover:scale-110 transition-transform duration-700">
                                    {item.icon}
                                </span>
                                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            <div className="p-8 text-center relative z-10 bg-white">
                                <h3 className="text-3xl font-bold text-gray-800 mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                <button 
                                onClick={handleRequireLogin}
                                className="mt-6 px-6 py-3 bg-amber-500 text-white rounded-full font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-amber-600">
                                    Order Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
            <LoginModal show={showLogin} onClose={() => setShowLogin(false)} onSuccess={handleLoginSuccess} />
            <SignupModal show={showSignup} onClose={() => setShowSignup(false)} />
            <ForgotPasswordModal show={showForgot} onClose={() => setShowForgot(false)} />
        </div>
    );
};

export default LandingPage;