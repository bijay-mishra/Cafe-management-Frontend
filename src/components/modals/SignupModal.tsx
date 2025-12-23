import { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';

interface Props {
    show: boolean;
    onClose: () => void;
}

const SignupModal: React.FC<Props> = ({ show, onClose }) => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = () => {
        if (!name || !contact || !email || !password || password !== confirmPassword) {
            alert('Please fill all fields correctly and ensure passwords match.');
            return;
        }

        alert('Signup successful! (Demo mode)');
        onClose();
    };

    return (
        <Modal
            title="Signup"
            show={show}
            onCancel={onClose}
            onSuccess={handleSignup}
            successButtonTitle="Signup"
            size="md"
        >
            <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                    <Input
                        label="Name"
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
                    label="Email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isRequired
                />
                <div className="grid grid-cols-2 gap-6">
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
            </div>
        </Modal>
    );
};

export default SignupModal;