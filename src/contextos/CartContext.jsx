import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children, user }) => {
  // Usa el id o email del usuario como clave, o "anon" si no hay usuario
  const userKey = user && user.id ? `cart_${user.id}` : "cart_anon";

  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem(userKey);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(userKey, JSON.stringify(cart));
  }, [cart, userKey]);

  // Cuando cambia el usuario, carga su carrito
  useEffect(() => {
    const stored = localStorage.getItem(userKey);
    setCart(stored ? JSON.parse(stored) : []);
  }, [userKey]);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find(item => item.id === product.id);
      if (found) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};