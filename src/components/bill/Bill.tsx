// src/pages/Bill.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Printer, CheckCircle } from 'lucide-react';
import Modal from '../common/Modal';
import { getBills, togglePaid } from './service/bill.query';
import { FaFileInvoiceDollar } from 'react-icons/fa';

const Bill = () => {
  const [bills, setBills] = useState<any[]>([]);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState<any | null>(null);

  const refresh = () => {
    setBills(getBills());
  };

  useEffect(() => {
    refresh();
  }, []);

  const openReceipt = (bill: any) => {
    setSelectedBill(bill);
    setShowReceiptModal(true);
  };

  const handleTogglePaid = (id: string) => {
    togglePaid(id);
    refresh();
  };

  const handlePrint = () => {
    window.print();
  };

  const hasBills = bills.length > 0;

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
              Bill Management ☕
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">
              Track payments and keep your finances in perfect order
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-amber-100 dark:border-amber-800/50"
          >
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-amber-100 dark:border-amber-800/50">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 dark:from-purple-600 dark:to-pink-700 text-white shadow-lg">
                  <FaFileInvoiceDollar className="w-8 h-8" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-amber-100">
                  All Bills <span className="text-purple-600 dark:text-purple-400">({bills.length})</span>
                </h2>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/50 dark:to-pink-900/50">
                  <tr>
                    <th className="px-4 py-5 text-left text-sm sm:text-base font-semibold text-gray-700 dark:text-purple-200">#</th>
                    <th className="px-4 py-5 text-left text-sm sm:text-base font-semibold text-gray-700 dark:text-purple-200">Customer</th>
                    <th className="px-4 py-5 text-left text-sm sm:text-base font-semibold text-gray-700 dark:text-purple-200">Items</th>
                    <th className="px-4 py-5 text-left text-sm sm:text-base font-semibold text-gray-700 dark:text-purple-200">Amount</th>
                    <th className="px-4 py-5 text-left text-sm sm:text-base font-semibold text-gray-700 dark:text-purple-200">Date</th>
                    <th className="px-4 py-5 text-center text-sm sm:text-base font-semibold text-gray-700 dark:text-purple-200">Status</th>
                    <th className="px-4 py-5 text-center text-sm sm:text-base font-semibold text-gray-700 dark:text-purple-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {!hasBills ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 sm:py-20 text-center">
                        <div className="max-w-3xl mx-auto">
                          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-12 border border-purple-100 dark:border-purple-800/50">
                            <div className="text-center mb-8">
                              <div className="flex justify-center items-center gap-3 mb-4">
                                <span className="text-5xl sm:text-7xl">☕</span>
                                <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 dark:text-amber-100">Cafe Bliss</h1>
                              </div>
                              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 font-medium">Sample Receipt Preview</p>
                              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2">This is how your real bills will look</p>
                            </div>

                            <div className="border-t-2 border-dashed border-gray-300 dark:border-gray-600 pt-6 mb-8">
                              <p className="text-lg sm:text-xl text-gray-800 dark:text-gray-200"><strong>Customer:</strong> Sarah Johnson</p>
                              <p className="text-lg sm:text-xl mt-3 text-gray-800 dark:text-gray-200"><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                            </div>

                            <table className="w-full mb-8">
                              <thead className="bg-purple-50 dark:bg-purple-900/40">
                                <tr>
                                  <th className="text-left py-3 px-4 text-base sm:text-lg text-gray-700 dark:text-purple-200">Item</th>
                                  <th className="text-center py-3 px-4 text-base sm:text-lg text-gray-700 dark:text-purple-200">Qty</th>
                                  <th className="text-right py-3 px-4 text-base sm:text-lg text-gray-700 dark:text-purple-200">Price</th>
                                  <th className="text-right py-3 px-4 text-base sm:text-lg text-gray-700 dark:text-purple-200">Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                  <td className="py-3 px-4 text-base sm:text-lg text-gray-800 dark:text-gray-200">Latte</td>
                                  <td className="text-center py-3 px-4 text-base sm:text-lg text-gray-800 dark:text-gray-200">2</td>
                                  <td className="text-right py-3 px-4 text-base sm:text-lg text-gray-800 dark:text-gray-200">$5.50</td>
                                  <td className="text-right py-3 px-4 text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200">$11.00</td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                  <td className="py-3 px-4 text-base sm:text-lg text-gray-800 dark:text-gray-200">Blueberry Muffin</td>
                                  <td className="text-center py-3 px-4 text-base sm:text-lg text-gray-800 dark:text-gray-200">1</td>
                                  <td className="text-right py-3 px-4 text-base sm:text-lg text-gray-800 dark:text-gray-200">$3.99</td>
                                  <td className="text-right py-3 px-4 text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200">$3.99</td>
                                </tr>
                                <tr>
                                  <td className="py-3 px-4 text-base sm:text-lg text-gray-800 dark:text-gray-200">Chocolate Croissant</td>
                                  <td className="text-center py-3 px-4 text-base sm:text-lg text-gray-800 dark:text-gray-200">1</td>
                                  <td className="text-right py-3 px-4 text-base sm:text-lg text-gray-800 dark:text-gray-200">$4.50</td>
                                  <td className="text-right py-3 px-4 text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200">$4.50</td>
                                </tr>
                              </tbody>
                            </table>

                            <div className="text-right border-t-2 border-dashed border-gray-300 dark:border-gray-600 pt-6">
                              <p className="text-2xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400">
                                Grand Total: $19.49
                              </p>
                              <p className="text-xl sm:text-2xl mt-6">
                                <span className="font-semibold text-gray-800 dark:text-gray-200">Status:</span>{' '}
                                <span className="font-bold text-emerald-600 dark:text-emerald-400">PAID</span>
                              </p>
                            </div>

                            <div className="text-center mt-10">
                              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 italic">
                                Thank you for choosing Cafe Bliss!
                              </p>
                              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-4">
                                Complete an order to generate real bills here
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    bills.map((bill, index) => (
                      <motion.tr
                        key={bill.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-purple-50/70 dark:hover:bg-purple-900/30 transition-colors"
                      >
                        <td className="px-4 py-5 text-gray-600 dark:text-gray-300 font-medium text-base">{index + 1}</td>
                        <td className="px-4 py-5 text-base sm:text-lg font-semibold text-gray-800 dark:text-purple-100">
                          {bill.customerName || 'Unknown'}
                        </td>
                        <td className="px-4 py-5 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                          {(bill.items?.length || 0)} item{(bill.items?.length || 0) !== 1 ? 's' : ''}
                        </td>
                        <td className="px-4 py-5 text-lg sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                          ${bill.totalAmount?.toFixed(2) ?? '0.00'}
                        </td>
                        <td className="px-4 py-5 text-gray-700 dark:text-gray-300 text-sm sm:text-base">{bill.date || 'N/A'}</td>
                        <td className="px-4 py-5 text-center">
                          <span
                            className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-white font-semibold shadow-md text-sm sm:text-base ${
                              bill.paid 
                                ? 'bg-emerald-600 dark:bg-emerald-700' 
                                : 'bg-red-600 dark:bg-red-700'
                            }`}
                          >
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            {bill.paid ? 'Paid' : 'Unpaid'}
                          </span>
                        </td>
                        <td className="px-4 py-5">
                          <div className="flex flex-col sm:flex-row justify-center gap-3">
                            <button
                              onClick={() => openReceipt(bill)}
                              className="flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-600 dark:to-pink-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                            >
                              <Printer className="w-4 h-4" />
                              View
                            </button>
                            <button
                              onClick={() => handleTogglePaid(bill.id)}
                              className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-medium text-white shadow-lg hover:scale-105 transition-all text-sm sm:text-base ${
                                bill.paid
                                  ? 'bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800'
                                  : 'bg-emerald-600 dark:bg-emerald-700 hover:bg-emerald-700 dark:hover:bg-emerald-800'
                              }`}
                            >
                              {bill.paid ? 'Mark Unpaid' : 'Mark Paid'}
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
                Every paid bill is a happy customer{' '}
                <span className="text-purple-600 dark:text-purple-400 font-bold">— keep the smiles coming!</span>
              </p>
            </motion.div>
          </div>
        </div>
      </main>
      <Modal
        title="Customer Receipt ☕"
        subtitle={`Bill for ${selectedBill?.customerName || 'Customer'}`}
        show={showReceiptModal}
        onCancel={() => setShowReceiptModal(false)}
        size="lg"
        showFooter={false}
      >
        {selectedBill && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-12 max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="flex justify-center items-center gap-4 mb-6">
                <span className="text-5xl sm:text-7xl">☕</span>
                <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 dark:text-amber-100">Cafe Bliss</h1>
              </div>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">Thank you for your visit!</p>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2">
                Date: {selectedBill.date || new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="border-t-2 border-dashed border-gray-300 dark:border-gray-600 pt-8 mb-10">
              <p className="text-lg sm:text-xl text-gray-800 dark:text-gray-200">
                <strong>Customer:</strong> {selectedBill.customerName || 'Unknown'}
              </p>
            </div>

            <table className="w-full mb-10">
              <thead className="bg-purple-50 dark:bg-purple-900/40">
                <tr>
                  <th className="text-left py-4 px-6 text-base sm:text-lg text-gray-700 dark:text-purple-200">Item</th>
                  <th className="text-center py-4 px-6 text-base sm:text-lg text-gray-700 dark:text-purple-200">Qty</th>
                  <th className="text-right py-4 px-6 text-base sm:text-lg text-gray-700 dark:text-purple-200">Price</th>
                  <th className="text-right py-4 px-6 text-base sm:text-lg text-gray-700 dark:text-purple-200">Total</th>
                </tr>
              </thead>
              <tbody>
                {(selectedBill.items || []).length > 0 ? (
                  selectedBill.items.map((item: any, idx: number) => (
                    <tr key={idx} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-4 px-6 text-base sm:text-lg text-gray-800 dark:text-gray-200">{item.productName || 'Unknown Item'}</td>
                      <td className="text-center py-4 px-6 text-base sm:text-lg text-gray-800 dark:text-gray-200">{item.quantity || 1}</td>
                      <td className="text-right py-4 px-6 text-base sm:text-lg text-gray-800 dark:text-gray-200">
                        ${(item.price || 0).toFixed(2)}
                      </td>
                      <td className="text-right py-4 px-6 text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200">
                        ${(item.total || item.price || 0).toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-10 text-gray-500 dark:text-gray-400 text-base sm:text-lg">
                      No items recorded
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="text-right border-t-2 border-dashed border-gray-300 dark:border-gray-600 pt-8">
              <p className="text-2xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400">
                Grand Total: ${selectedBill.totalAmount?.toFixed(2) ?? '0.00'}
              </p>
              <p className="text-xl sm:text-2xl mt-6">
                <span className="font-semibold text-gray-800 dark:text-gray-200">Status:</span>{' '}
                <span className={`font-bold ${selectedBill.paid ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                  {selectedBill.paid ? 'PAID' : 'UNPAID'}
                </span>
              </p>
            </div>

            <div className="text-center mt-12">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-600 dark:to-pink-700 text-white text-lg sm:text-xl font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Printer className="w-6 h-6" />
                Print Receipt
              </button>
              <p className="text-gray-500 dark:text-gray-400 mt-8 text-sm sm:text-base">
                We hope to see you again soon! ☕✨
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Bill;