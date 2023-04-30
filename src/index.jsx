import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import ResetStyle from "./styles/ResetStyle";
import { ThemeProvider } from "./contexts/ThemeContext";
import GlobalStyleWrapper from "./styles/GlobalStyle";
import CartProvider from "./contexts/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ResetStyle />
    <ThemeProvider>
      <GlobalStyleWrapper />
      <CartProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
);
