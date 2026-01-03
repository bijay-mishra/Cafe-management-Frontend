import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { Package, AlertTriangle } from 'lucide-react';
import Modal from '../common/Modal';
import ProductForm from './ProductForm';
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  toggleProductActive
} from './service/product.query';

const Product = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<any | null>(null);

  const refresh = () => {
    setProducts(getProducts());
  };

  useEffect(() => {
    refresh();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setShowAddEditModal(true);
  };

  const openEditModal = (product: any) => {
    setEditingProduct(product);
    setShowAddEditModal(true);
  };

  const handleSave = (data: any) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data);
    } else {
      addProduct(data);
    }
    setShowAddEditModal(false);
    refresh();
  };

  const openDeleteModal = (product: any) => {
    setDeletingProduct(product);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (deletingProduct) {
      deleteProduct(deletingProduct.id);
      refresh();
    }
    setShowDeleteModal(false);
    setDeletingProduct(null);
  };

  const handleToggleActive = (id: string) => {
    toggleProductActive(id);
    refresh();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-gray-900 dark:via-amber-950 dark:to-rose-950 overflow-x-hidden transition-colors duration-500">
      <main className="pt-20 px-4 sm:px-6 lg:px-8 md:ml-64">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10 sm:mb-14"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-amber-100 mb-3">
              Product Management ☕
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">
              Showcase your delicious menu items with pride
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-amber-100 dark:border-amber-800/50"
          >
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-amber-100 dark:border-amber-800/50">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 dark:from-emerald-500 dark:to-teal-700 text-white shadow-lg">
                  <Package className="w-8 h-8" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-amber-100">
                  All Products <span className="text-emerald-600 dark:text-emerald-400">({products.length})</span>
                </h2>
              </div>

              <button
                onClick={openAddModal}
                className="inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 text-white text-base sm:text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
              >
                <FaPlus className="w-5 h-5" />
                Add Product
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/50 dark:to-teal-900/50">
                  <tr>
                    <th className="px-4 py-5 text-left text-sm sm:text-base font-semibold text-gray-700 dark:text-emerald-200">#</th>
                    <th className="px-4 py-5 text-left text-sm sm:text-base font-semibold text-gray-700 dark:text-emerald-200">Image</th>
                    <th className="px-4 py-5 text-left text-sm sm:text-base font-semibold text-gray-700 dark:text-emerald-200">Name</th>
                    <th className="px-4 py-5 text-left text-sm sm:text-base font-semibold text-gray-700 dark:text-emerald-200">Category</th>
                    <th className="px-4 py-5 text-left text-sm sm:text-base font-semibold text-gray-700 dark:text-emerald-200">Price</th>
                    <th className="px-4 py-5 text-center text-sm sm:text-base font-semibold text-gray-700 dark:text-emerald-200">Status</th>
                    <th className="px-4 py-5 text-center text-sm sm:text-base font-semibold text-gray-700 dark:text-emerald-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-16 sm:py-20 text-center">
                        <div className="text-gray-500 dark:text-gray-400">
                          <Package className="w-16 h-16 mx-auto mb-4 opacity-30" />
                          <p className="text-lg sm:text-xl">No products yet</p>
                          <p className="text-base sm:text-lg mt-2">Click "Add Product" to start building your menu!</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    products.map((product, index) => (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/30 transition-colors"
                      >
                        <td className="px-4 py-5 text-gray-600 dark:text-gray-300 font-medium text-base">{index + 1}</td>
                        <td className="px-4 py-5">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gray-200 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden">
                            {product.image ? (
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <Package className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400 dark:text-gray-500" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-5 text-base sm:text-lg font-semibold text-gray-800 dark:text-emerald-100">{product.name}</td>
                        <td className="px-4 py-5 text-gray-700 dark:text-gray-300 text-sm sm:text-base">{product.category}</td>
                        <td className="px-4 py-5 text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400">${product.price.toFixed(2)}</td>
                        <td className="px-4 py-5 text-center">
                          <button
                            onClick={() => handleToggleActive(product.id)}
                            className="focus:outline-none"
                          >
                            {product.active ? (
                              <FaToggleOn className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors" />
                            ) : (
                              <FaToggleOff className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 transition-colors" />
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-5">
                          <div className="flex flex-col sm:flex-row justify-center gap-3">
                            <button
                              onClick={() => openEditModal(product)}
                              className="flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                            >
                              <FaEdit className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => openDeleteModal(product)}
                              className="flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-red-500 to-rose-600 dark:from-red-600 dark:to-rose-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                            >
                              <FaTrash className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
          <div className="text-center mt-12 sm:mt-16 mb-12 sm:mb-20 lg:mb-32">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-block bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-xl p-6 sm:p-8 border border-amber-100 dark:border-amber-800/50 max-w-4xl mx-auto"
            >
              <p className="text-lg sm:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed">
                A great menu starts with great products{' '}
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">— make yours irresistible!</span>
              </p>
            </motion.div>
          </div>
        </div>
      </main>
      <Modal
        title={editingProduct ? "Edit Product ☕" : "Add New Product ☕"}
        subtitle={editingProduct ? "Update your menu item details" : "Bring a new delicious item to your menu"}
        show={showAddEditModal}
        onCancel={() => setShowAddEditModal(false)}
        showFooter={false}
        size="lg"
      >
        <ProductForm
          initialData={editingProduct || undefined}
          onSave={handleSave}
          onCancel={() => setShowAddEditModal(false)}
        />
      </Modal>

      <Modal
        title="Delete Product? ⚠️"
        subtitle={`Are you sure you want to remove "${deletingProduct?.name}" from your menu?`}
        show={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onSuccess={handleDelete}
        successButtonTitle="Yes, Delete"
        cancelButtonTitle="Cancel"
        size="sm"
      >
        <div className="py-10 text-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 sm:w-14 sm:h-14 text-red-600 dark:text-red-400" />
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-200">
            This action <strong>cannot be undone</strong>.
          </p>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-4">
            The item will no longer appear on your menu.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Product;