import { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';

interface Props {
    show: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const LoginModal: React.FC<Props> = ({ show, onClose, onSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (username === 'admin' && password === '123') {
            onSuccess();
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <Modal
            title="Login"
            show={show}
            onCancel={onClose}
            onSuccess={handleLogin}
            successButtonTitle="Login"
            size="sm"
        >
            <div className="space-y-8">
                {error && <p className="text-red-500 text-center">{error}</p>}
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
        </Modal>
    );
};

export default LoginModal;