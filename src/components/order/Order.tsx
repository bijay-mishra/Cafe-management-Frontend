import { useState } from 'react';
import { getOrders, addOrder, updateOrderStatus } from './service/order.query';
import OrderForm from './OrderForm';
import type { Order as OrderType, OrderItem } from './schema/order.schema';
import Button from '../common/Button';


const Order = () => {
  const [orders, setOrders] = useState<OrderType[]>(getOrders());

  const refresh = () => setOrders(getOrders());

  const handleNewOrder = (customerName: string, items: OrderItem[]) => {
    addOrder({
      customerName,
      items,
      totalAmount: items.reduce((sum, item) => sum + item.total, 0),
      status: 'pending' as const,
    });
    refresh();
  };

  return (
    <div>
      <h2 className="text-4xl font-bold mb-10">Order Management</h2>

      <div className="bg-white p-8 rounded-2xl shadow-xl mb-10">
        <h3 className="text-2xl font-semibold mb-6">Create New Order</h3>
        <OrderForm onSubmit={handleNewOrder} />
      </div>

      <div className="bg-white rounded-2xl shadow-xl">
        <h3 className="text-2xl font-semibold p-6">Active Orders</h3>
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-6 text-left">Customer</th>
              <th className="p-6 text-left">Items</th>
              <th className="p-6 text-left">Total</th>
              <th className="p-6 text-left">Status</th>
              <th className="p-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="p-6">{order.customerName}</td>
                <td className="p-6">{order.items.length} items</td>
                <td className="p-6">${order.totalAmount.toFixed(2)}</td>
                <td className="p-6">
                  <span
                    className={`px-4 py-2 rounded-full text-white font-medium ${
                      order.status === 'completed' ? 'bg-green-600' : 'bg-orange-500'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-6">
                  {order.status === 'pending' && (
                    <Button
                      onClick={() => {
                        updateOrderStatus(order.id, 'completed');
                        refresh();
                      }}
                    >
                      Complete
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;