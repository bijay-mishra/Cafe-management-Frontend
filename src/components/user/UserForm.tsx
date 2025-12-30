import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

interface Props {
  initialData?: {
    name?: string;
    email?: string;
    role?: string;
  };
  onSave: (data: { name: string; email: string; role: string }) => void;
  onCancel?: () => void;
}
const UserForm: React.FC<Props> = ({ initialData = {}, onSave, onCancel }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [role, setRole] = useState(initialData?.role || 'staff');
  const handleSubmit = () => {
    if (name.trim() && email.trim()) {
      onSave({ name: name.trim(), email: email.trim(), role });
    }
  };
  return (
    <div className="space-y-10 py-6">
      <Input
      name="fullName"
        label="Full Name"
        placeholder="e.g., Sarah Johnson"
        value={name}
        onChange={(e) => setName(e.target.value)}
        isRequired
      />
      <Input
        name="email"
        label="Email Address"
        type="email"
        placeholder="e.g., sarah@cafebliss.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        isRequired
      />
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-3">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition text-lg"
        >
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="flex justify-end gap-6 pt-6 border-t border-amber-100">
        {onCancel && (
          <Button
            variant="secondary"
            onClick={onCancel}
            className="px-8 py-3 text-lg font-medium"
          >
            Cancel
          </Button>
        )}
        <Button
          onClick={handleSubmit}
          disabled={!name.trim() || !email.trim()}
          className="px-10 py-3 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {initialData?.name ? 'Update User' : 'Create User'}
        </Button>
      </div>
    </div>
  );
};
export default UserForm;