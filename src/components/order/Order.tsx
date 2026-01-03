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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-gray-900 dark:via-amber-950 dark:to-rose-950 overflow-x-hidden transition-colors duration-500">
      <main className="pt-20 px-4 sm:px-6 lg:px-8 md:ml-64">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10 sm:mb-14"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-amber-100 mb-3">
              Order Management ☕
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">
              Keep your cafe running smoothly — one happy customer at a time
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-amber-100 dark:border-amber-800/50"
          >
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-amber-100 dark:border-amber-800/50">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-600 dark:from-orange-500 dark:to-amber-700 text-white shadow-lg">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-amber-100">
                  Active Orders <span className="text-orange-600 dark:text-orange-400">({orders.length})</span>
                </h2>
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-orange-500 to-amber-600 dark:from-orange-600 dark:to-amber-700 text-white text-base sm:text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
              >
                <ShoppingCart className="w-5 h-5" />
                Create New Order
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/50 dark:to-amber-900/50">
                  <tr>
                    <th className="px-4 py-5 text-left text-sm sm:text-base font-semibold text-gray-700 dark:text-orange-200">#</th>
                    <th className="px-4 py-5 text-left text-sm sm:text-base font-semibold text-gray-700 dark:text-orange-200">Customer</th>
                    <th className="px-4 py-5 text-left text-sm sm:text-base font-semibold text-gray-700 dark:text-orange-200">Items</th>
                    <th className="px-4 py-5 text-left text-sm sm:text-base font-semibold text-gray-700 dark:text-orange-200">Total</th>
                    <th className="px-4 py-5 text-center text-sm sm:text-base font-semibold text-gray-700 dark:text-orange-200">Status</th>
                    <th className="px-4 py-5 text-center text-sm sm:text-base font-semibold text-gray-700 dark:text-orange-200">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-16 sm:py-20 text-center">
                        <div className="text-gray-500 dark:text-gray-400">
                          <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-30" />
                          <p className="text-lg sm:text-xl">No active orders</p>
                          <p className="text-base sm:text-lg mt-2">Click "Create New Order" when a customer arrives!</p>
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
                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-orange-50/70 dark:hover:bg-orange-900/30 transition-colors"
                      >
                        <td className="px-4 py-5 text-gray-600 dark:text-gray-300 font-medium text-base">{index + 1}</td>
                        <td className="px-4 py-5 text-base sm:text-lg font-semibold text-gray-800 dark:text-orange-100">{order.customerName}</td>
                        <td className="px-4 py-5 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </td>
                        <td className="px-4 py-5 text-lg sm:text-xl font-bold text-orange-600 dark:text-orange-400">
                          ${order.totalAmount.toFixed(2)}
                        </td>
                        <td className="px-4 py-5 text-center">
                          <span
                            className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-white font-semibold shadow-md text-sm sm:text-base ${
                              order.status === 'completed'
                                ? 'bg-emerald-600 dark:bg-emerald-700'
                                : 'bg-orange-500 dark:bg-orange-600'
                            }`}
                          >
                            {order.status === 'completed' ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <ShoppingCart className="w-5 h-5" />
                            )}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-5 text-center">
                          {order.status === 'pending' ? (
                            <button
                              onClick={() => handleCompleteOrder(order.id)}
                              className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 text-white font-medium sm:font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                            >
                              <CheckCircle className="w-5 h-5" />
                              Mark as Completed
                            </button>
                          ) : (
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium text-base">
                              Order Served ✓
                            </span>
                          )}
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
                Every order is a smile waiting to happen{' '}
                <span className="text-orange-600 dark:text-orange-400 font-bold">— serve with love!</span>
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      <Modal
        title="Create New Order ☕"
        subtitle="Take a new order from your customer"
        show={showCreateModal}
        onCancel={() => setShowCreateModal(false)}
        showFooter={false}
        size="lg"
      >
        <OrderForm onSubmit={handleNewOrder} />
      </Modal>
    </div>
  );
};

export default Order;