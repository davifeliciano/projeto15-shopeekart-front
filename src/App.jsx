import { Routes, Route } from "react-router-dom";
import Root from "./routes/Root";
import SignUp from "./routes/SignUp";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}