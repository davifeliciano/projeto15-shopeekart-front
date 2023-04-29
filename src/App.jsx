import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Root from "./routes/Root";
import SignUp from "./routes/SignUp";
import Login from "./routes/Login";
import PersistLogin from "./components/PersistLogin";
import RedirectIfAuth from "./components/RedirectIfAuth";
import Product from "./routes/Product";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

export default function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Root />} />
        <Route path="/product/:id" element={<Product />} />
        <Route element={<RedirectIfAuth />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Route>
    </Routes>
  );
}
