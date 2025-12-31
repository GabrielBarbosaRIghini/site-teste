import { createContext, useContext, useEffect, useState } from 'react';
import { products } from '../data/products';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        localStorage.removeItem('cart');
      }
    }
  }, []);

  const saveCart = (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const addToCart = (productId, quantity = 1) => {
    const existingItemIndex = cart.findIndex(item => item.id === productId);

    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      saveCart(updatedCart);
    } else {
      saveCart([...cart, { id: productId, quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    saveCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const existingItemIndex = cart.findIndex(item => item.id === productId);
    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity = newQuantity;
      saveCart(updatedCart);
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const openProductModal = (product) => {
    setCurrentProduct(product);
    setIsProductModalOpen(true);
  };

  /* =========================
     🚀 PONTE PARA WHATSAPP
     ========================= */
  const sendCartToWhatsApp = () => {
    if (cart.length === 0) return;

    const itemsWithDetails = cart.map(item => {
      const product = products.find(p => p.id === item.id);
      return product
        ? `${product.name} (${item.quantity}x) - R$ ${(product.price * item.quantity).toFixed(2)}`
        : null;
    }).filter(Boolean);

    const total = itemsWithDetails.reduce((sum, _, index) => {
      const product = products.find(p => p.id === cart[index].id);
      return sum + (product.price * cart[index].quantity);
    }, 0);

    const message =
      `Olá! Gostaria de fazer um pedido:\n\n` +
      itemsWithDetails.map(item => `• ${item}`).join('\n') +
      `\n\nTotal: R$ ${total.toFixed(2)}`;

    const phone = '5532999999999'; // <-- WhatsApp da loja
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
  };

  return (
    <CartContext.Provider value={{
      cart,
      cartCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      isCartOpen,
      setIsCartOpen,
      isProductModalOpen,
      setIsProductModalOpen,
      currentProduct,
      openProductModal,
      sendCartToWhatsApp // 👈 exportando a ponte
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
