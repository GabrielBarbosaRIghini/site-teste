import { useEffect, useState } from 'react';
import { FaTimes, FaTrash } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const CartModal = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateQuantity,
    cartCount,
    sendCartToWhatsApp // 👈 IMPORTANTE
  } = useCart();

  const [cartProducts, setCartProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : '';
  }, [isCartOpen]);

  useEffect(() => {
    const cartItems = cart
      .map(item => {
        const product = products.find(p => p.id === item.id);
        return product ? { ...product, quantity: item.quantity } : null;
      })
      .filter(Boolean);

    setCartProducts(cartItems);

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(total);
  }, [cart]);

  if (!isCartOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => setIsCartOpen(false)}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] mx-4 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold dark:text-white">
            {cartCount > 0 ? 'Your Cart' : 'Cart is Empty'}
          </h2>
          <button onClick={() => setIsCartOpen(false)}>
            <FaTimes />
          </button>
        </div>

        {/* Items */}
        <div className="flex-grow overflow-y-auto p-4">
          {cartCount === 0 ? (
            <p className="text-center text-gray-500">
              Your cart is empty.
            </p>
          ) : (
            <div className="space-y-4">
              {cartProducts.map(item => (
                <div key={item.id} className="flex items-center gap-4 border-b pb-3">
                  <img
                    src={item.imageSrc}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium dark:text-white">{item.name}</h3>
                    <p className="text-green-600">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)}>
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartCount > 0 && (
          <div className="border-t dark:border-gray-700 p-4">
            <div className="flex justify-between mb-4">
              <span className="dark:text-gray-300">Subtotal:</span>
              <strong className="dark:text-white">
                ${subtotal.toFixed(2)}
              </strong>
            </div>

            {/* 🔥 BOTÃO FINAL */}
            <button
              onClick={() => {
                sendCartToWhatsApp();
                setIsCartOpen(false);
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-medium"
            >
              Finalizar pedido no WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
