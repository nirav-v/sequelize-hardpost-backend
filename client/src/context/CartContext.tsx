import { Item } from "../types/ItemTypes";
import Auth from "../util/auth.ts";
import React, { useState, useEffect, createContext, useContext } from "react";

// cart context will be the values returned from useState hook
type CartContextType = [Item[], React.Dispatch<React.SetStateAction<Item[]>>];

const CartContext = createContext<CartContextType>([[], () => {}]);

export const useCartContext = () => useContext(CartContext);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Item[]>([]);
  console.log(cart);
  useEffect(() => {
    // if not logged in, use local storage to store cart
    if (!Auth.isLoggedIn()) {
      const localCartData = localStorage.getItem("cart");
      const cart = localCartData ? JSON.parse(localCartData) : [];
      setCart(cart);
      return; // not logged in, return before api call below
    }

    fetch("/api/cart", {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, [Auth.isLoggedIn()]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
