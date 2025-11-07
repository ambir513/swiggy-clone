import { useState } from "react";
import { addToCart } from "./addToCart";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <addToCart.Provider value={{ cartItems, setCartItems }}>
      {children}
    </addToCart.Provider>
  );
};
