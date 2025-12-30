import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import type { Product } from './schema/product.schema';
import { Package } from 'lucide-react';

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
  const [image, setImage] = useState(initialData.image || '');
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSave = () => {
    if (name.trim() && category.trim() && price > 0) {
      onSave({
        name: name.trim(),
        category: category.trim(),
        price,
        description: description.trim(),
        image,
        active: initialData.active ?? true,
      });
    }
  };
  return (
    <div className="space-y-10 py-6">
      <div className="flex flex-col items-center">
        <div className="w-40 h-40 rounded-3xl bg-gray-100 border-4 border-dashed border-amber-200 flex items-center justify-center overflow-hidden mb-6">
          {image ? (
            <img src={image} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <Package className="w-16 h-16 text-amber-300" />
          )}
        </div>
        <label className="cursor-pointer px-6 py-3 bg-amber-500 text-white rounded-full font-medium hover:bg-amber-600 transition shadow-lg">
          Upload Image
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Input
          name="productName"
          label="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          isRequired
        />
        <Input
          name="productCategory"
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          isRequired
        />
        <Input
          name="productPrice"
          label="Price ($)"
          type="number"
          value={price || ''}
          onChange={(e) => setPrice(Number(e.target.value))}
          isRequired
        />
        <Input
          name="productDescription"
          label="Description (Optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex justify-end gap-6 pt-8 border-t border-amber-100">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} className="px-8 py-3 text-lg">
            Cancel
          </Button>
        )}
        <Button
          onClick={handleSave}
          disabled={!name.trim() || !category.trim() || price <= 0}
          className="px-10 py-3 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Save Product
        </Button>
      </div>
    </div>
  );
};

export default ProductForm;