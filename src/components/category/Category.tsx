import { useState } from 'react';
import { getCategories, addCategory, updateCategory, deleteCategory } from './service/category.query';
import CategoryForm from './CategoryForm';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Category = () => {
  const [categories, setCategories] = useState(getCategories());
  const [editingId, setEditingId] = useState<string | null>(null);

  const refresh = () => setCategories(getCategories());

  return (
    <div>
      <h2 className="text-4xl font-bold mb-10">Category Management</h2>

      <div className="bg-white p-8 rounded-2xl shadow-xl mb-10">
        <h3 className="text-2xl font-semibold mb-6">
          {editingId ? 'Edit Category' : 'Add New Category'}
        </h3>
        <CategoryForm
          initialName={categories.find(c => c.id === editingId)?.name || ''}
          onSave={(name) => {
            if (editingId) {
              updateCategory(editingId, name);
            } else {
              addCategory(name);
            }
            setEditingId(null);
            refresh();
          }}
          onCancel={() => setEditingId(null)}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-xl">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-6 text-left">Name</th>
              <th className="p-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td className="p-6">{cat.name}</td>
                <td className="p-6 flex gap-6">
                  <FaEdit className="text-blue-600 cursor-pointer text-xl" onClick={() => setEditingId(cat.id)} />
                  <FaTrash className="text-red-600 cursor-pointer text-xl" onClick={() => {
                    deleteCategory(cat.id);
                    refresh();
                  }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;