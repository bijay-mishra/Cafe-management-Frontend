import type { Bill } from "../schema/bill.schema";

let bills: Bill[] = [
  { id: '1', orderId: '1', customerName: 'John Doe', totalAmount: 9.5, date: '2025-12-23', paid: true },
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