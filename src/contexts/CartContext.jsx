import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage("cart", []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
export default CartProvider;
