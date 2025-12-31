import type { Bill } from "../schema/bill.schema";

let bills: Bill[] = [
  {
    id: '1',
    orderId: '1',
    customerName: 'John Doe',
    totalAmount: 9.5,
    date: new Date().toLocaleDateString(),
    paid: true,
    items: [
      { productName: 'Latte', quantity: 1, price: 5.5, total: 5.5 },
      { productName: 'Croissant', quantity: 1, price: 4.0, total: 4.0 },
    ],
  },
  {
    id: '2',
    orderId: '2',
    customerName: 'Bijay Mishra',
    totalAmount: 325.28,
    date: new Date().toLocaleDateString(),
    paid: false,
    items: [
      { productName: 'Coffee', quantity: 1, price: 55, total: 55.28 },
      { productName: 'Sandwich', quantity: 1, price: 120, total: 120 },
      { productName: 'Katti Roll', quantity: 150, price: 150, total: 150 },

    ],
  },
];

export const getBills = () => [...bills];
export const addBill = (bill: Omit<Bill, 'id'>) => {
  const newBill = { ...bill, id: Date.now().toString() };
  bills.push(newBill);
  return newBill;
};
export const togglePaid = (id: string) => {
  bills = bills.map(b => b.id === id ? { ...b, paid: !b.paid } : b);
};