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
    status: 'completed' as const,
  },
];

let bills: any[] = JSON.parse(localStorage.getItem('bills') || '[]');

const loadOrders = () => {
  const saved = localStorage.getItem('orders');
  if (saved) {
    orders = JSON.parse(saved);
  }
};
loadOrders();
const saveOrders = () => {
  localStorage.setItem('orders', JSON.stringify(orders));
};
const saveBills = () => {
  localStorage.setItem('bills', JSON.stringify(bills));
};

export const getOrders = () => [...orders];

export const addOrder = (order: Omit<Order, 'id' | 'date'>) => {
  const newOrder: Order = {
    ...order,
    id: Date.now().toString(),
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
  };
  orders.push(newOrder);
  saveOrders();
  return newOrder;
};

export const updateOrderStatus = (id: string, status: 'pending' | 'completed') => {
  orders = orders.map(o => {
    if (o.id === id) {
      const updated = { ...o, status };

      if (status === 'completed') {
        const newBill = {
          id: Date.now().toString() + '-bill',
          customerName: updated.customerName,
          items: updated.items,
          totalAmount: updated.totalAmount,
          date: updated.date,
          paid: false, 
        };

        const exists = bills.some(b => b.id === newBill.id || 
          (b.customerName === newBill.customerName && 
           b.totalAmount === newBill.totalAmount && 
           b.date === newBill.date));
        if (!exists) {
          bills.push(newBill);
          saveBills();
        }
      }

      return updated;
    }
    return o;
  });

  saveOrders();
};