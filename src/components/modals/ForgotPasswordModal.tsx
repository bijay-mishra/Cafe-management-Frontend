import { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';

interface Props {
  show: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<Props> = ({ show, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!email.trim() || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsSent(true);
      setIsLoading(false);
    }, 1200);
  };

  const handleReset = () => {
    setEmail('');
    setIsSent(false);
  };

  return (
    <Modal
      title="Reset Password 🔑"
      subtitle={isSent ? "Check your inbox!" : "We'll send you a recovery link"}
      show={show}
      onCancel={isSent ? handleReset : onClose}
      onSuccess={isSent ? handleReset : handleSend}
      successButtonTitle={isSent ? "Done" : isLoading ? "Sending..." : "Send Reset Link"}
      successButtonDisabled={isLoading}
      cancelButtonTitle={isSent ? undefined : "Cancel"}
      size="sm"
    >
      <div className="space-y-8 py-6">
        {isSent ? (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
              <span className="text-4xl">✔</span>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
                Password reset link sent!
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                We've sent instructions to <strong>{email}</strong>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                (Demo mode — no email actually sent)
              </p>
            </div>
          </div>
        ) : (
          <>
            <Input
              label="Your Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRequired
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Enter your email and we'll send you a password reset link.
            </p>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ForgotPasswordModal;