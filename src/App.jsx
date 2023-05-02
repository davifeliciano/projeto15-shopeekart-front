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
import MyPurchase from "./routes/MyPurchase";
import MyAddresses from "./routes/MyAddresses";
import MyPassword from "./routes/MyPassword";
import MyProfile from "./routes/MyProfile";
import RequireAuth from "./components/RequireAuth";
import Reset from "./routes/Reset";
import Order from "./routes/Order";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

export default function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Root />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route element={<RequireAuth />}>
          <Route element={<MyPages />}>
            <Route path="/user/account/profile" element={<MyProfile />} />
            <Route path="/user/account/addresses" element={<MyAddresses />} />
            <Route path="/user/account/password" element={<MyPassword />} />
            <Route path="/user/purchase" element={<MyPurchase />} />
          </Route>
          <Route path="/order/:id" element={<Order />} />
        </Route>
        <Route element={<RedirectIfAuth />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<Reset />} />
        </Route>
      </Route>
    </Routes>
  );
}
