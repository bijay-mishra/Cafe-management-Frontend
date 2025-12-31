export interface Bill {
  id: string;
  orderId: string;
  customerName: string;
  totalAmount: number;
  date: string;
  paid: boolean;
  items?:any
}