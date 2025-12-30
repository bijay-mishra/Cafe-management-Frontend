import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import Modal from '../common/Modal';
import OrderForm from './OrderForm';
import {
  getOrders,
  addOrder,
  updateOrderStatus
} from './service/order.query';
import type { Order as OrderType } from './schema/order.schema';

const Order = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const refresh = () => {
    setOrders(getOrders());
  };
  useEffect(() => {
    refresh();
  }, []);
  const handleNewOrder = (customerName: string, items: any[]) => {
    const totalAmount = items.reduce((sum: number, item: any) => sum + item.total, 0);
    addOrder({
      customerName: customerName.trim(),
      items,
      totalAmount,
      status: 'pending',
    });
    setShowCreateModal(false);
    refresh();
  };
  const handleCompleteOrder = (id: string) => {
    updateOrderStatus(id, 'completed');
    refresh();
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
            Order Management ☕
          </h1>
          <p className="text-xl text-gray-600">
            Keep your cafe running smoothly — one happy customer at a time
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-amber-100"
        >
          <div className="p-8 flex justify-between items-center border-b border-amber-100">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-600 text-white shadow-lg">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                Active Orders ({orders.length})
              </h2>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
              Create New Order
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-orange-50 to-amber-50">
                <tr>
                  <th className="px-10 py-6 text-left text-lg font-semibold text-gray-700">#</th>
                  <th className="px-10 py-6 text-left text-lg font-semibold text-gray-700">Customer</th>
                  <th className="px-10 py-6 text-left text-lg font-semibold text-gray-700">Items</th>
                  <th className="px-10 py-6 text-left text-lg font-semibold text-gray-700">Total</th>
                  <th className="px-10 py-6 text-center text-lg font-semibold text-gray-700">Status</th>
                  <th className="px-10 py-6 text-center text-lg font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-10 py-20 text-center">
                      <div className="text-gray-500">
                        <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <p className="text-xl">No orders yet</p>
                        <p className="text-lg mt-2">Click "Create New Order" when a customer arrives!</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  orders.map((order, index) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-orange-50/50 transition-colors"
                    >
                      <td className="px-10 py-6 text-gray-600 font-medium">{index + 1}</td>
                      <td className="px-10 py-6 text-lg font-semibold text-gray-800">{order.customerName}</td>
                      <td className="px-10 py-6 text-700">{order.items.length} item{order.items.length > 1 ? 's' : ''}</td>
                      <td className="px-10 py-6 text-xl font-bold text-orange-600">
                        ${order.totalAmount.toFixed(2)}
                      </td>
                      <td className="px-10 py-6 text-center">
                        <span
                          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold shadow-md ${order.status === 'completed' ? 'bg-emerald-600' : 'bg-orange-500'
                            }`}
                        >
                          {order.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-center">
                        {order.status === 'pending' && (
                          <button
                            onClick={() => handleCompleteOrder(order.id)}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                          >
                            <CheckCircle className="w-5 h-5" />
                            Mark as Completed
                          </button>
                        )}
                        {order.status === 'completed' && (
                          <span className="text-emerald-600 font-medium">Order Served ✓</span>
                        )}
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
              Every order is a smile waiting to happen{' '}
              <span className="text-orange-600 font-bold">— serve with love!</span>
            </p>
          </motion.div>
        </div>
      </div>
      <Modal
        title="Create New Order ☕"
        subtitle="Take a new order from your customer"
        show={showCreateModal}
        onCancel={() => setShowCreateModal(false)}
        showFooter={false}
        size="md"
      >
        <OrderForm onSubmit={handleNewOrder} />
      </Modal>
    </div>
  );
};

export default Order;