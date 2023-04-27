import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Root from "./routes/Root";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
    </Routes>
  );
}
