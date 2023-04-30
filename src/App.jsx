import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Root from "./routes/Root";
import SignUp from "./routes/SignUp";
import Login from "./routes/Login";
import PersistLogin from "./components/PersistLogin";
import RedirectIfAuth from "./components/RedirectIfAuth";
import Product from "./routes/Product";
import Cart from "./routes/Cart";
import MyPages from "./components/MyPages";
import MyAccount from "./routes/MyAccount";
import MyPurchase from "./routes/MyPurchase";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

export default function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Root />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route element={<MyPages />}>
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/mypurchase" element={<MyPurchase />} />
        </Route>
        <Route element={<RedirectIfAuth />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Route>
    </Routes>
  );
}
