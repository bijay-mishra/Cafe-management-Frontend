import { useCart } from '../../context/CartContext';
import Button from '../common/Button';

const CartSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { cart, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white shadow-2xl h-full overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Cart ({totalItems})</h2>
            <button onClick={onClose} className="text-3xl">&times;</button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 py-10">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                <span className="text-4xl">{item.icon}</span>
                <div className="flex-1">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-amber-600 font-bold">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-amber-500 text-white hover:bg-amber-600 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t p-6">
            <div className="flex justify-between text-xl font-bold mb-6">
              <span>Total</span>
              <span className="text-amber-600">₹{totalPrice}</span>
            </div>
            <Button variant="secondary" fullWidth>
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;