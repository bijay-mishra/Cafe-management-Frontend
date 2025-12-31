import { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';

interface Props {
    show: boolean;
    onClose: () => void;
    onSwitchToLogin?: () => void;
}

const SignupModal: React.FC<Props> = ({ show, onClose, onSwitchToLogin }) => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = () => {
        if (!name || !contact || !email || !password) {
            alert('Please fill in all required fields.');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            alert('Signup successful! You can now log in. (Demo mode)');
            setIsLoading(false);
            onClose();
        }, 1000);
    };

    return (
        <Modal
            title="Join Cafe Bliss ✨"
            subtitle="Create your account and start managing"
            show={show}
            onCancel={onClose}
            onSuccess={handleSignup}
            successButtonTitle={isLoading ? "Creating Account..." : "Sign Up"}
            successButtonDisabled={isLoading}
            size="md"
        >
            <div className="space-y-7 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Full Name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        isRequired
                    />
                    <Input
                        label="Contact Number"
                        name="contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        isRequired
                    />
                </div>

                <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isRequired
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isRequired
                    />
                    <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        isRequired
                    />
                </div>

                <p className="text-center text-sm text-gray-600 -mt-2">
                    Already have an account?{' '}
                    <button
                        onClick={onSwitchToLogin}
                        className="text-blue-600 font-medium hover:underline focus:outline-none"
                    >
                        Click here to login
                    </button>
                </p>
            </div>
        </Modal>
    );
};

export default SignupModal;