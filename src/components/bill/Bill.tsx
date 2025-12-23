import { useState } from 'react';
import { getBills, togglePaid } from './service/bill.query';
import Button from '../common/Button';

const Bill = () => {
  const [bills, setBills] = useState(getBills());

  const refresh = () => setBills(getBills());

  return (
    <div>
      <h2 className="text-4xl font-bold mb-10">Bill Management</h2>

      <div className="bg-white rounded-2xl shadow-xl">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-6 text-left">Customer</th>
              <th className="p-6 text-left">Amount</th>
              <th className="p-6 text-left">Date</th>
              <th className="p-6 text-left">Status</th>
              <th className="p-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id}>
                <td className="p-6">{bill.customerName}</td>
                <td className="p-6">${bill.totalAmount}</td>
                <td className="p-6">{bill.date}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-white ${bill.paid ? 'bg-green-600' : 'bg-red-600'}`}>
                    {bill.paid ? 'Paid' : 'Unpaid'}
                  </span>
                </td>
                <td className="p-6">
                  <Button variant={bill.paid ? 'secondary' : 'primary'} onClick={() => {
                    togglePaid(bill.id);
                    refresh();
                  }}>
                    {bill.paid ? 'Mark Unpaid' : 'Mark Paid'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bill;