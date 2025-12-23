import { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';

interface Props {
  show: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<Props> = ({ show, onClose }) => {
  const [email, setEmail] = useState('');

  const handleSend = () => {
    if (!email.trim()) {
      alert('Please enter your email');
      return;
    }

    alert(`Password reset link sent to ${email}! (Demo mode)`);
    onClose();
  };

  return (
    <Modal
      title="Forgot Password?"
      show={show}
      onCancel={onClose}
      onSuccess={handleSend}
      successButtonTitle="Send Password"
      size="sm"
    >
      <div className="space-y-8">
        <Input
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isRequired
        />
      </div>
    </Modal>
  );
};

export default ForgotPasswordModal;