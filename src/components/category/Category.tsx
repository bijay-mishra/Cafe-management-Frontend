import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Coffee, AlertTriangle } from 'lucide-react';
import Modal from '../common/Modal';
import CategoryForm from './CategoryForm';
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory
} from './service/category.query';

const Category = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<any | null>(null);

  const refresh = () => {
    setCategories(getCategories());
  };

  useEffect(() => {
    refresh();
  }, []);

  const openAddModal = () => {
    setEditingCategory(null);
    setShowAddEditModal(true);
  };

  const openEditModal = (cat: any) => {
    setEditingCategory(cat);
    setShowAddEditModal(true);
  };

  const handleSave = (name: string) => {
    if (editingCategory) {
      updateCategory(editingCategory.id, name);
    } else {
      addCategory(name);
    }
    setShowAddEditModal(false);
    refresh();
  };

  const openDeleteModal = (cat: any) => {
    setDeletingCategory(cat);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (deletingCategory) {
      deleteCategory(deletingCategory.id);
      refresh();
    }
    setShowDeleteModal(false);
    setDeletingCategory(null);
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
              Category Management ☕
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">
              Organize your menu beautifully — one category at a time
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-amber-100 dark:border-amber-800/50"
          >
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-amber-100 dark:border-amber-800/50">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 text-white shadow-lg">
                  <Coffee className="w-8 h-8" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-amber-100">
                  All Categories <span className="text-amber-600 dark:text-amber-400">({categories.length})</span>
                </h2>
              </div>
              <button
                onClick={openAddModal}
                className="inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700 text-white text-base sm:text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                <FaPlus className="w-5 h-5" />
                Add Category
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/50 dark:to-orange-900/50">
                  <tr>
                    <th className="px-6 py-5 text-left text-base sm:text-lg font-semibold text-gray-700 dark:text-amber-200 whitespace-nowrap">#</th>
                    <th className="px-6 py-5 text-left text-base sm:text-lg font-semibold text-gray-700 dark:text-amber-200">Category Name</th>
                    <th className="px-6 py-5 text-center text-base sm:text-lg font-semibold text-gray-700 dark:text-amber-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-16 sm:py-20 text-center">
                        <div className="text-gray-500 dark:text-gray-400">
                          <Coffee className="w-16 h-16 mx-auto mb-4 opacity-30" />
                          <p className="text-lg sm:text-xl">No categories yet</p>
                          <p className="text-base sm:text-lg mt-2">Click "Add Category" to create your first one!</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    categories.map((cat, index) => (
                      <motion.tr
                        key={cat.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-amber-50/70 dark:hover:bg-amber-900/30 transition-colors"
                      >
                        <td className="px-6 py-5 text-gray-600 dark:text-gray-300 font-medium text-base">{index + 1}</td>
                        <td className="px-6 py-5 text-base sm:text-lg font-semibold text-gray-800 dark:text-amber-100">{cat.name}</td>
                        <td className="px-6 py-5">
                          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                            <button
                              onClick={() => openEditModal(cat)}
                              className="flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                            >
                              <FaEdit className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => openDeleteModal(cat)}
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
                Well-organized categories make your menu shine{' '}
                <span className="text-amber-600 dark:text-amber-400 font-bold">— keep it cozy!</span>
              </p>
            </motion.div>
          </div>
        </div>
      </main>
      <Modal
        title={editingCategory ? "Edit Category ☕" : "Add New Category ☕"}
        subtitle="Give your menu section a clear and inviting name"
        show={showAddEditModal}
        onCancel={() => setShowAddEditModal(false)}
        showFooter={false}
        size="md"
      >
        <CategoryForm
          initialName={editingCategory?.name || ''}
          onSave={handleSave}
          onCancel={() => setShowAddEditModal(false)}
        />
      </Modal>
      <Modal
        title="Delete Category? ⚠️"
        subtitle={`Are you sure you want to delete "${deletingCategory?.name}"?`}
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
            All products in this category may become uncategorized.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Category;