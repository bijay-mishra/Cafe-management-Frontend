import type { Order } from "../schema/order.schema";

let orders: Order[] = [
  {
    id: '1',
    customerName: 'John Doe',
    items: [
      { productName: 'Espresso', quantity: 2, price: 3.5, total: 7.0 },
      { productName: 'Croissant', quantity: 1, price: 2.5, total: 2.5 },
    ],
    totalAmount: 9.5,
    date: '2025-12-23',
    status: 'completed'
  },
];

export const getOrders = () => [...orders];
export const addOrder = (order: Omit<Order, 'id' | 'date'>) => {
  const newOrder = { ...order, id: Date.now().toString(), date: new Date().toISOString().split('T')[0] };
  orders.push(newOrder);
  return newOrder;
};
export const updateOrderStatus = (id: string, status: 'pending' | 'completed') => {
  orders = orders.map(o => o.id === id ? { ...o, status } : o);
};