import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { ShoppingCart } from 'lucide-react';

interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

interface Props {
  onSubmit: (customerName: string, items: OrderItem[]) => void;
}
const OrderForm: React.FC<Props> = ({ onSubmit }) => {
  const [customerName, setCustomerName] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [items, setItems] = useState<OrderItem[]>([]);

  const addItem = () => {
    if (productName.trim() && quantity > 0 && price > 0) {
      const newItem: OrderItem = {
        productName: productName.trim(),
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

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const total = items.reduce((sum, item) => sum + item.total, 0);

  const handleSubmit = () => {
    if (customerName.trim() && items.length > 0) {
      onSubmit(customerName.trim(), items);
      setCustomerName('');
      setItems([]);
    }
  };

  return (
    <div className="space-y-10 py-6">
      <Input
        name="customerName"
        label="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        isRequired
      />

      <div className="bg-amber-50/50 p-8 rounded-2xl border border-amber-200">
        <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <ShoppingCart className="w-7 h-7 text-orange-600" />
          Add Order Items
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Input
            name="productName"
            label="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <Input
            name="quantity"
            label="Quantity"
            type="number"
            min="1"
            value={quantity.toString()}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
          />
          <Input
            name="price"
            label="Price ($)"
            type="number"
            min="0"
            value={price > 0 ? price.toString() : ''}
            onChange={(e) => setPrice(Number(e.target.value) || 0)}
          />
        </div>

        <Button
          onClick={addItem}
          disabled={!productName.trim() || quantity < 1 || price <= 0}
          className="w-full py-4 text-lg bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
        >
          + Add Item to Order
        </Button>
      </div>

      {items.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-100">
          <h4 className="text-2xl font-bold text-gray-800 mb-6">Current Order Items</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-orange-50">
                <tr>
                  <th className="px-6 py-4 text-left">Product</th>
                  <th className="px-6 py-4 text-center">Qty</th>
                  <th className="px-6 py-4 text-right">Price</th>
                  <th className="px-6 py-4 text-right">Total</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="px-6 py-4 font-medium">{item.productName}</td>
                    <td className="px-6 py-4 text-center">{item.quantity}</td>
                    <td className="px-6 py-4 text-right">${item.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right font-bold text-orange-600">
                      ${item.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-right">
            <p className="text-3xl font-bold text-orange-600">
              Grand Total: ${total.toFixed(2)}
            </p>
          </div>
        </div>
      )}
      <div className="flex justify-end pt-8 border-t border-amber-100">
        <Button
          onClick={handleSubmit}
          disabled={!customerName.trim() || items.length === 0}
          className="px-12 py-4 text-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          Submit Order
        </Button>
      </div>
    </div>
  );
};

export default OrderForm;