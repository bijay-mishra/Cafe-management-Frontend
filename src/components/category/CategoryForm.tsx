import Input from '../common/Input';
import Button from '../common/Button';
import { useState } from 'react';

interface Props {
  initialName?: string;
  onSave: (name: string) => void;
  onCancel?: () => void;
}

const CategoryForm: React.FC<Props> = ({ initialName = '', onSave, onCancel }) => {
  const [name, setName] = useState(initialName);

  return (
    <div className="space-y-6">
      <Input placeholder="Category Name" value={name} onChange={(e) => setName(e.target.value)} />
      <div className="flex gap-4">
        <Button onClick={() => onSave(name)}>Save</Button>
        {onCancel && <Button variant="secondary" onClick={onCancel}>Cancel</Button>}
      </div>
    </div>
  );
};

export default CategoryForm;