import { useState } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct, toggleProductActive } from './service/product.query';
import ProductForm from './ProductForm';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Product = () => {
  const [products, setProducts] = useState(getProducts());
  const [editingId, setEditingId] = useState<string | null>(null);

  const refresh = () => setProducts(getProducts());

  const currentProduct = products.find(p => p.id === editingId);

  return (
    <div>
      <h2 className="text-4xl font-bold mb-10">Product Management</h2>

      <div className="bg-white p-8 rounded-2xl shadow-xl mb-10">
        <h3 className="text-2xl font-semibold mb-6">
          {editingId ? 'Edit Product' : 'Add New Product'}
        </h3>
        <ProductForm
          initialData={currentProduct}
          onSave={(data) => {
            if (editingId) {
              updateProduct(editingId, data);
            } else {
              addProduct(data);
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
              <th className="p-6 text-left">Category</th>
              <th className="p-6 text-left">Price</th>
              <th className="p-6 text-left">Status</th>
              <th className="p-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="p-6">{p.name}</td>
                <td className="p-6">{p.category}</td>
                <td className="p-6">${p.price}</td>
                <td className="p-6">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={p.active}
                      onChange={() => {
                        toggleProductActive(p.id);
                        refresh();
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                  </label>
                </td>
                <td className="p-6 flex gap-6">
                  <FaEdit className="text-blue-600 cursor-pointer text-xl" onClick={() => setEditingId(p.id)} />
                  <FaTrash className="text-red-600 cursor-pointer text-xl" onClick={() => {
                    deleteProduct(p.id);
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

export default Product;