import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    const isItemInCart = cart.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
      setCart(
        cart.map(
          (
            cartItem, // if item already in cart, increase quantity
          ) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem, // otherwise, return cart item
        ),
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]); // if item not in cart, add it
    }
  }

  function removeFromCart(item) {
    const isItemInCart = cart.find((cartItem) => cartItem.id === item.id);

    if (!isItemInCart) return;

    if (isItemInCart.quantity === 1) {
      setCart(cart.filter((cart) => cart.id !== item.id)); // if quantity is 1, remove item
    } else {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 } // if quant > 1, decrement quant
            : cartItem,
        ),
      );
    }
  }

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default function useCart() {
  return useContext(CartContext);
}
