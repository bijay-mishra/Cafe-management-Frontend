import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, UserX } from 'lucide-react';
import Modal from '../common/Modal';
import UserForm from './UserForm';
import { 
  getUsers, 
  addUser, 
  updateUser, 
  deleteUser 
} from './service/user.query';
const User = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [deletingUser, setDeletingUser] = useState<any | null>(null);
  const refresh = () => {
    setUsers(getUsers());
  };
  useEffect(() => {
    refresh();
  }, []);

  const openAddModal = () => {
    setEditingUser(null);
    setShowAddEditModal(true);
  };

  const openEditModal = (user: any) => {
    setEditingUser(user);
    setShowAddEditModal(true);
  };

  const handleSave = (data: { name: string; email: string; role: string }) => {
    if (editingUser) {
      updateUser(editingUser.id, data);
    } else {
      addUser(data);
    }
    setShowAddEditModal(false);
    refresh();
  };

  const openDeleteModal = (user: any) => {
    setDeletingUser(user);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (deletingUser) {
      deleteUser(deletingUser.id);
      refresh();
    }
    setShowDeleteModal(false);
    setDeletingUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-gray-900 dark:via-amber-950 dark:to-rose-950 overflow-x-hidden transition-colors duration-500">
  <main className="pt-20 px-4 sm:px-6 lg:px-8 md:ml-64">
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 sm:mb-14"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-amber-100 mb-3">
          User Management ☕
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">
          Manage your cafe staff and admin accounts
        </p>
      </motion.div>

      {/* Table Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-amber-100 dark:border-amber-800/50"
      >
        {/* Header with icon + button */}
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-amber-100 dark:border-amber-800/50">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 dark:from-purple-500 dark:to-pink-600 text-white shadow-lg">
              <Users className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-amber-100">
              All Users <span className="text-purple-600 dark:text-purple-400">({users.length})</span>
            </h2>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-600 dark:to-pink-700 text-white text-base sm:text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <UserPlus className="w-5 h-5" />
            Add User
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/50 dark:to-pink-900/50">
              <tr>
                <th className="px-4 py-5 text-left text-sm sm:text-base font-semibold text-gray-700 dark:text-purple-200">#</th>
                <th className="px-4 py-5 text-left text-sm sm:text-base font-semibold text-gray-700 dark:text-purple-200">Name</th>
                <th className="px-4 py-5 text-left text-sm sm:text-base font-semibold text-gray-700 dark:text-purple-200">Email</th>
                <th className="px-4 py-5 text-left text-sm sm:text-base font-semibold text-gray-700 dark:text-purple-200">Role</th>
                <th className="px-4 py-5 text-center text-sm sm:text-base font-semibold text-gray-700 dark:text-purple-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 sm:py-20 text-center">
                    <div className="text-gray-500 dark:text-gray-400">
                      <Users className="w-16 h-16 mx-auto mb-4 opacity-30" />
                      <p className="text-lg sm:text-xl">No users yet</p>
                      <p className="text-base sm:text-lg mt-2">Click "Add User" to create the first staff account!</p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-purple-50/50 dark:hover:bg-purple-900/30 transition-colors"
                  >
                    <td className="px-4 py-5 text-gray-600 dark:text-gray-300 font-medium text-base">{index + 1}</td>
                    <td className="px-4 py-5 text-base sm:text-lg font-semibold text-gray-800 dark:text-purple-100">{user.name}</td>
                    <td className="px-4 py-5 text-gray-700 dark:text-gray-300 text-sm sm:text-base">{user.email}</td>
                    <td className="px-4 py-5">
                      <span className={`px-4 py-2 rounded-full text-white font-medium text-sm ${
                        user.role === 'admin' ? 'bg-purple-600' : 'bg-indigo-600'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <button
                          onClick={() => openEditModal(user)}
                          className="flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(user)}
                          className="flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                        >
                          <UserX className="w-4 h-4" />
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

      {/* Footer */}
      <div className="text-center mt-12 sm:mt-16 mb-12 sm:mb-20 lg:mb-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-block bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-xl p-6 sm:p-8 border border-amber-100 dark:border-amber-800/50 max-w-4xl mx-auto"
        >
          <p className="text-lg sm:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed">
            Great teams make great cafes{' '}
            <span className="text-purple-600 dark:text-purple-400 font-bold">— build yours here!</span>
          </p>
        </motion.div>
      </div>
    </div>

    {/* Modals */}
    <Modal
      title={editingUser ? "Edit User ☕" : "Add New User ☕"}
      subtitle={editingUser ? "Update staff member details" : "Create a new staff account"}
      show={showAddEditModal}
      onCancel={() => setShowAddEditModal(false)}
      showFooter={false}
      size="lg"
    >
      <UserForm
        initialData={editingUser}
        onSave={handleSave}
        onCancel={() => setShowAddEditModal(false)}
      />
    </Modal>
    <Modal
      title="Delete User?"
      subtitle={`Are you sure you want to remove "${deletingUser?.name}"?`}
      show={showDeleteModal}
      onCancel={() => setShowDeleteModal(false)}
      onSuccess={handleDelete}
      successButtonTitle="Yes, Delete"
      cancelButtonTitle="Cancel"
      size="sm"
    >
      <div className="py-10 text-center">
        <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
          <UserX className="w-12 h-12 sm:w-14 sm:h-14 text-red-600 dark:text-red-400" />
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-200">
          This action <strong>cannot be undone</strong>.
        </p>
      </div>
    </Modal>
  </main>
</div>

  );
};

export default User;