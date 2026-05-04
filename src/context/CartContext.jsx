import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  return <CartContext value={{ cart, setCart }}>{children}</CartContext>;
}

export default function useCart() {
  return useContext(CartContext);
}
