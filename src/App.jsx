import { Routes, Route } from "react-router-dom";
import Root from "./routes/Root";
import Register from "./routes/Register";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}