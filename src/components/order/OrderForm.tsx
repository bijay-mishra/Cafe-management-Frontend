import { useState } from 'react';
import type { OrderItem } from './schema/order.schema';
import Input from '../common/Input';
import Button from '../common/Button';


interface Props {
  onSubmit: (customerName: string, items: OrderItem[]) => void;
}

const OrderForm: React.FC<Props> = ({ onSubmit }) => {
  const [customerName, setCustomerName] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [items, setItems] = useState<OrderItem[]>([]);

  const addItem = () => {
    if (productName && quantity > 0 && price > 0) {
      const newItem: OrderItem = {
        productName,
        quantity,
        price,
        total: quantity * price,
      };
      setItems([...items, newItem]);
      setProductName('');
      setQuantity(1);
      setPrice(0);
    }
  };

  const total = items.reduce((sum, item) => sum + item.total, 0);

  const handleSubmit = () => {
    if (customerName.trim() && items.length > 0) {
      onSubmit(customerName.trim(), items);
      setCustomerName('');
      setItems([]);
    }
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <Input
        placeholder="Customer Name *"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />

      <div className="grid grid-cols-3 gap-4">
        <Input
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Quantity"
          value={quantity.toString()}
          onChange={(e) => setQuantity(Number(e.target.value) || 1)}
        />
        <Input
          type="number"
          placeholder="Price"
          value={price.toString()}
          onChange={(e) => setPrice(Number(e.target.value) || 0)}
        />
      </div>

      <Button onClick={addItem}>+ Add Item</Button>

      {items.length > 0 && (
        <div className="bg-gray-50 p-6 rounded-xl">
          <h4 className="text-xl font-bold mb-4">Order Items</h4>
          <table className="w-full mb-4">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Product</th>
                <th className="text-left py-2">Qty</th>
                <th className="text-left py-2">Price</th>
                <th className="text-left py-2">Total</th>
                <th className="text-left py-2"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{item.productName}</td>
                  <td className="py-2">{item.quantity}</td>
                  <td className="py-2">${item.price.toFixed(2)}</td>
                  <td className="py-2">${item.total.toFixed(2)}</td>
                  <td className="py-2">
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right text-2xl font-bold">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}

      <Button onClick={handleSubmit} className="w-full py-4 text-xl">
        Submit Order
      </Button>
    </div>
  );
};

export default OrderForm;