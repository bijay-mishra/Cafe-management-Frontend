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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            User Management ☕
          </h1>
          <p className="text-xl text-gray-600">
            Manage your cafe staff and admin accounts
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-amber-100"
        >
          <div className="p-8 flex justify-between items-center border-b border-amber-100">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 text-white shadow-lg">
                <Users className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                All Users ({users.length})
              </h2>
            </div>

            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <UserPlus className="w-5 h-5" />
              Add User
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-50 to-pink-50">
                <tr>
                  <th className="px-10 py-6 text-left text-lg font-semibold text-gray-700">#</th>
                  <th className="px-10 py-6 text-left text-lg font-semibold text-gray-700">Name</th>
                  <th className="px-10 py-6 text-left text-lg font-semibold text-gray-700">Email</th>
                  <th className="px-10 py-6 text-left text-lg font-semibold text-gray-700">Role</th>
                  <th className="px-10 py-6 text-center text-lg font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-10 py-20 text-center">
                      <div className="text-gray-500">
                        <Users className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <p className="text-xl">No users yet</p>
                        <p className="text-lg mt-2">Click "Add User" to create the first staff account!</p>
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
                      className="border-b border-gray-100 hover:bg-purple-50/50 transition-colors"
                    >
                      <td className="px-10 py-6 text-gray-600 font-medium">{index + 1}</td>
                      <td className="px-10 py-6 text-lg font-semibold text-gray-800">{user.name}</td>
                      <td className="px-10 py-6 text-gray-700">{user.email}</td>
                      <td className="px-10 py-6">
                        <span className={`px-4 py-2 rounded-full text-white font-medium text-sm ${
                          user.role === 'admin' ? 'bg-purple-600' : 'bg-indigo-600'
                        }`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-center">
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={() => openEditModal(user)}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => openDeleteModal(user)}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
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
        <div className="text-center mt-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-amber-100"
          >
            <p className="text-2xl text-gray-700">
              Great teams make great cafes{' '}
              <span className="text-purple-600 font-bold">— build yours here!</span>
            </p>
          </motion.div>
        </div>
      </div>
      <Modal
        title={editingUser ? "Edit User ☕" : "Add New User ☕"}
        subtitle={editingUser ? "Update staff member details" : "Create a new staff account"}
        show={showAddEditModal}
        onCancel={() => setShowAddEditModal(false)}
        showFooter={false}
        size="md"
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
          <div className="w-28 h-28 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <UserX className="w-14 h-14 text-red-600" />
          </div>
          <p className="text-lg text-gray-700">
            This action <strong>cannot be undone</strong>.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default User;