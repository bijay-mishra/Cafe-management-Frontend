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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Bill Management ☕
          </h1>
          <p className="text-xl text-gray-600">
            Track payments and keep your finances in perfect order
          </p>
        </motion.div>

        {/* Main Bills Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-amber-100"
        >
          <div className="p-8 flex items-center gap-4 border-b border-amber-100">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg">
              <FaFileInvoiceDollar className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              All Bills ({bills.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-50 to-pink-50">
                <tr>
                  <th className="px-10 py-6 text-left text-lg font-semibold text-gray-700">#</th>
                  <th className="px-10 py-6 text-left text-lg font-semibold text-gray-700">Customer</th>
                  <th className="px-10 py-6 text-left text-lg font-semibold text-gray-700">Items</th>
                  <th className="px-10 py-6 text-left text-lg font-semibold text-gray-700">Amount</th>
                  <th className="px-10 py-6 text-left text-lg font-semibold text-gray-700">Date</th>
                  <th className="px-10 py-6 text-center text-lg font-semibold text-gray-700">Status</th>
                  <th className="px-10 py-6 text-center text-lg font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-10 py-24 text-center">
                      <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-2xl p-12 border border-purple-100">
                          <div className="text-center mb-10">
                            <div className="flex justify-center items-center gap-4 mb-6">
                              <span className="text-7xl">☕</span>
                              <h1 className="text-5xl font-bold text-gray-800">Cafe Bliss</h1>
                            </div>
                            <p className="text-2xl text-gray-600 font-medium">Sample Receipt Preview</p>
                            <p className="text-base text-gray-500 mt-3">This is how your real bills will look</p>
                          </div>

                          <div className="border-t-2 border-dashed border-gray-300 pt-8 mb-10">
                            <p className="text-xl"><strong>Customer:</strong> Sarah Johnson</p>
                            <p className="text-xl mt-3"><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                          </div>

                          <table className="w-full mb-10">
                            <thead className="bg-purple-50">
                              <tr>
                                <th className="text-left py-4 px-6 text-lg">Item</th>
                                <th className="text-center py-4 px-6 text-lg">Qty</th>
                                <th className="text-right py-4 px-6 text-lg">Price</th>
                                <th className="text-right py-4 px-6 text-lg">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="py-4 px-6 text-lg">Latte</td>
                                <td className="text-center py-4 px-6 text-lg">2</td>
                                <td className="text-right py-4 px-6 text-lg">$5.50</td>
                                <td className="text-right py-4 px-6 text-lg font-medium">$11.00</td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-4 px-6 text-lg">Blueberry Muffin</td>
                                <td className="text-center py-4 px-6 text-lg">1</td>
                                <td className="text-right py-4 px-6 text-lg">$3.99</td>
                                <td className="text-right py-4 px-6 text-lg font-medium">$3.99</td>
                              </tr>
                              <tr>
                                <td className="py-4 px-6 text-lg">Chocolate Croissant</td>
                                <td className="text-center py-4 px-6 text-lg">1</td>
                                <td className="text-right py-4 px-6 text-lg">$4.50</td>
                                <td className="text-right py-4 px-6 text-lg font-medium">$4.50</td>
                              </tr>
                            </tbody>
                          </table>

                          <div className="text-right border-t-2 border-dashed border-gray-300 pt-8">
                            <p className="text-4xl font-bold text-purple-600">
                              Grand Total: $19.49
                            </p>
                            <p className="text-2xl mt-6">
                              <span className="font-semibold">Status:</span>{' '}
                              <span className="font-bold text-emerald-600">PAID</span>
                            </p>
                          </div>

                          <div className="text-center mt-12">
                            <p className="text-xl text-gray-600 italic">
                              Thank you for choosing Cafe Bliss!
                            </p>
                            <p className="text-base text-gray-500 mt-6">
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
                      className="border-b border-gray-100 hover:bg-purple-50/50 transition-colors"
                    >
                      <td className="px-10 py-6 text-gray-600 font-medium">{index + 1}</td>
                      <td className="px-10 py-6 text-lg font-semibold text-gray-800">{bill.customerName}</td>
                      <td className="px-10 py-6 text-gray-700">{bill.items.length} item{bill.items.length > 1 ? 's' : ''}</td>
                      <td className="px-10 py-6 text-2xl font-bold text-purple-600">
                        ${bill.totalAmount.toFixed(2)}
                      </td>
                      <td className="px-10 py-6 text-gray-700">{bill.date}</td>
                      <td className="px-10 py-6 text-center">
                        <span
                          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold shadow-md ${
                            bill.paid ? 'bg-emerald-600' : 'bg-red-600'
                          }`}
                        >
                          <CheckCircle className="w-5 h-5" />
                          {bill.paid ? 'Paid' : 'Unpaid'}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-center">
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={() => openReceipt(bill)}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                          >
                            <Printer className="w-4 h-4" />
                            View Receipt
                          </button>
                          <button
                            onClick={() => handleTogglePaid(bill.id)}
                            className={`px-6 py-3 rounded-xl font-medium text-white shadow-lg transition-all hover:scale-105 ${
                              bill.paid ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'
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

        {/* Bottom Message */}
        <div className="text-center mt-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-amber-100"
          >
            <p className="text-2xl text-gray-700">
              Every paid bill is a happy customer{' '}
              <span className="text-purple-600 font-bold">— keep the smiles coming!</span>
            </p>
          </motion.div>
        </div>

        {/* Receipt Modal */}
        <Modal
          title="Customer Receipt"
          subtitle={`Bill for ${selectedBill?.customerName || ''}`}
          show={showReceiptModal}
          onCancel={() => setShowReceiptModal(false)}
          size="lg"
          showFooter={false}
        >
          {selectedBill && (
            <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-2xl mx-auto print:shadow-none print:bg-white">
              <div className="text-center mb-10">
                <div className="flex justify-center items-center gap-4 mb-4">
                  <span className="text-6xl">☕</span>
                  <h1 className="text-4xl font-bold text-gray-800">Cafe Bliss</h1>
                </div>
                <p className="text-lg text-gray-600">Thank you for your visit!</p>
                <p className="text-sm text-gray-500 mt-2">Date: {selectedBill.date}</p>
              </div>

              <div className="border-t-2 border-dashed border-gray-300 pt-6 mb-8">
                <p className="text-lg"><strong>Customer:</strong> {selectedBill.customerName}</p>
              </div>

              <table className="w-full mb-8">
                <thead className="bg-purple-50">
                  <tr>
                    <th className="text-left py-3 px-4">Item</th>
                    <th className="text-center py-3 px-4">Qty</th>
                    <th className="text-right py-3 px-4">Price</th>
                    <th className="text-right py-3 px-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBill.items.map((item: any, idx: number) => (
                    <tr key={idx} className="border-b">
                      <td className="py-3 px-4">{item.productName}</td>
                      <td className="text-center py-3 px-4">{item.quantity}</td>
                      <td className="text-right py-3 px-4">${item.price.toFixed(2)}</td>
                      <td className="text-right py-3 px-4 font-medium">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="text-right border-t-2 border-dashed border-gray-300 pt-6">
                <p className="text-3xl font-bold text-purple-600">
                  Grand Total: ${selectedBill.totalAmount.toFixed(2)}
                </p>
                <p className="text-xl mt-4">
                  <span className="font-semibold">Status:</span>{' '}
                  <span className={`font-bold ${selectedBill.paid ? 'text-emerald-600' : 'text-red-600'}`}>
                    {selectedBill.paid ? 'PAID' : 'UNPAID'}
                  </span>
                </p>
              </div>

              <div className="text-center mt-12">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xl font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 print:hidden"
                >
                  <Printer className="w-6 h-6" />
                  Print Receipt
                </button>
                <p className="text-gray-500 mt-8 text-sm">
                  We hope to see you again soon! ☕✨
                </p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Bill;