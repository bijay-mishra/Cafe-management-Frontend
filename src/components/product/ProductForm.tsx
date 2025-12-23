import { useState } from 'react';
import type { Product } from './schema/product.schema';
import Input from '../common/Input';
import Button from '../common/Button';


interface Props {
  initialData?: Partial<Product>;
  onSave: (data: Omit<Product, 'id'>) => void;
  onCancel?: () => void;
}

const ProductForm: React.FC<Props> = ({ initialData = {}, onSave, onCancel }) => {
  const [name, setName] = useState(initialData.name || '');
  const [category, setCategory] = useState(initialData.category || '');
  const [price, setPrice] = useState(initialData.price || 0);
  const [description, setDescription] = useState(initialData.description || '');

  const handleSave = () => {
    if (name && category && price > 0) {
      onSave({ name, category, price, description, active: true });
    }
  };

  return (
    <div className="space-y-6">
      <Input placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <Input type="number" placeholder="Price" value={String(price)} onChange={(e) => setPrice(Number(e.target.value))} />
      <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <div className="flex gap-4">
        <Button onClick={handleSave}>Save</Button>
        {onCancel && <Button variant="secondary" onClick={onCancel}>Cancel</Button>}
      </div>
    </div>
  );
};

export default ProductForm;