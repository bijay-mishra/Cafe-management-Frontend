import { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import SignupModal from './SignupModal';

interface Props {
    show: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const LoginModal: React.FC<Props> = ({ show, onClose, onSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const handleLogin = async () => {
        setError('');
        setIsLoading(true);

        setTimeout(() => {
            if (username === 'admin' && password === '123') {
                onSuccess();
            } else {
                setError('Invalid username or password');
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <>
            <Modal
                title="Welcome Back ☕"
                subtitle="Login to manage your cafe"
                show={show && !showSignup}
                onCancel={onClose}
                onSuccess={handleLogin}
                successButtonTitle={isLoading ? "Logging in..." : "Login"}
                successButtonDisabled={isLoading || !username || !password}
                size="sm"
                className="backdrop-blur-xl"
            >
                <div className="space-y-7 py-4">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center animate-pulse">
                            {error}
                        </div>
                    )}

                    <div className="space-y-6">
                        <Input
                            label="Username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            isRequired
                        />
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            isRequired
                        />
                    </div>

                    <p className="text-center text-sm text-gray-600">
                        Demo credentials: <span className="font-semibold">admin / 123</span>
                    </p>

                    {/* Switch to Signup */}
                    <p className="text-center text-sm text-gray-600">
                        Don't have an account yet?{' '}
                        <button
                            onClick={() => setShowSignup(true)}
                            className="text-blue-600 font-medium hover:underline focus:outline-none"
                        >
                            Click here to register
                        </button>
                    </p>
                </div>
            </Modal>

            <SignupModal
                show={showSignup}
                onClose={() => {
                    setShowSignup(false);
                }}
                onSwitchToLogin={() => setShowSignup(false)}
            />
        </>
    );
};

export default LoginModal;