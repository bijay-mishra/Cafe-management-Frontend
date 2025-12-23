import { useState, useEffect } from 'react';
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
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-blue-600 text-white px-8 py-6 flex justify-between items-center shadow-lg">
                <div className="flex items-center gap-4">
                    <span className="text-4xl">☕</span>
                    <h1 className="text-3xl font-bold">Cafe Management System</h1>
                </div>
                <div className="space-x-10 text-lg font-medium">
                    <button
                        onClick={() => setShowLogin(true)}
                        className="hover:underline transition"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setShowSignup(true)}
                        className="hover:underline transition"
                    >
                        Signup
                    </button>
                    <button
                        onClick={() => setShowForgot(true)}
                        className="hover:underline transition"
                    >
                        Forgot Password?
                    </button>
                </div>
            </header>
            <div
                className="w-full h-96 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/images/cafe-banner.jpg)' }}
            />
            <div className="py-6 bg-white">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800">
                    Best Seller
                </h2>
            </div>
            <div className="w-full px-8 pb-20">
                <div className="grid grid-cols-12 gap-12">
                    <div className="col-span-12 md:col-span-6 bg-gradient-to-b from-blue-900 to-blue-700 text-white rounded-xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300">
                        <div className="w-full h-80 flex items-center justify-center">
                            <span className="text-9xl">🍕</span>
                        </div>
                        <div className="p-10 text-center">
                            <h3 className="text-4xl font-bold mb-4">Pizza</h3>
                            <p className="text-lg opacity-90">
                                Our signature hand-tossed pizza with fresh ingredients and melted cheese
                            </p>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 bg-gradient-to-b from-blue-900 to-blue-700 text-white rounded-xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300">
                        <div className="w-full h-80 flex items-center justify-center">
                            <span className="text-9xl">☕</span>
                        </div>
                        <div className="p-10 text-center">
                            <h3 className="text-4xl font-bold mb-4">Coffee</h3>
                            <p className="text-lg opacity-90">
                                Premium Arabica beans freshly brewed for the perfect morning kick
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            <LoginModal
                show={showLogin}
                onClose={() => setShowLogin(false)}
                onSuccess={handleLoginSuccess}
            />
            <SignupModal
                show={showSignup}
                onClose={() => setShowSignup(false)}
            />
            <ForgotPasswordModal
                show={showForgot}
                onClose={() => setShowForgot(false)}
            />
        </div>
    );
};

export default LandingPage;