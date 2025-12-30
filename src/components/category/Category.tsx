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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 pt-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Category Management ☕
          </h1>
          <p className="text-xl text-gray-600">
            Organize your menu beautifully — one category at a time
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-amber-100"
        >
          <div className="p-8 flex justify-between items-center border-b border-amber-100">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg">
                <Coffee className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                All Categories ({categories.length})
              </h2>
            </div>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <FaPlus className="w-5 h-5" />
              Add Category
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-amber-50 to-orange-50">
                <tr>
                  <th className="px-10 py-6 text-left text-lg font-semibold text-gray-700">#</th>
                  <th className="px-10 py-6 text-left text-lg font-semibold text-gray-700">Category Name</th>
                  <th className="px-10 py-6 text-center text-lg font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-10 py-20 text-center">
                      <div className="text-gray-500">
                        <Coffee className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <p className="text-xl">No categories yet</p>
                        <p className="text-lg mt-2">Click "Add Category" to create your first one!</p>
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
                      className="border-b border-gray-100 hover:bg-amber-50/70 transition-colors"
                    >
                      <td className="px-10 py-6 text-gray-600 font-medium">{index + 1}</td>
                      <td className="px-10 py-6 text-lg font-semibold text-gray-800">{cat.name}</td>
                      <td className="px-10 py-6">
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={() => openEditModal(cat)}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                          >
                            <FaEdit className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => openDeleteModal(cat)}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
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
        <div className="text-center mt-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="inline-block bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-amber-100">
            <p className="text-2xl text-gray-700">
              Well-organized categories make your menu shine{' '}
              <span className="text-amber-600 font-bold">— keep it cozy!</span>
            </p>
          </motion.div>
        </div>
      </div>
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
          <div className="w-28 h-28 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-14 h-14 text-red-600" />
          </div>
          <p className="text-lg text-gray-700">
            This action <strong>cannot be undone</strong>.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            All products in this category may become uncategorized.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Category;