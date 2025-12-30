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

  const handleSubmit = () => {
    if (name.trim()) {
      onSave(name.trim());
    }
  };
  return (
    <div className="space-y-10 py-6">
      <Input
        name="categoryName"
        label="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        isRequired
      />
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
          disabled={!name.trim()}
          className="px-10 py-3 text-lg font-semibold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Save Category
        </Button>
      </div>
    </div>
  );
};

export default CategoryForm;