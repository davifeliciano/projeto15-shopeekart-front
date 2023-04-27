import { Routes, Route } from "react-router-dom";
import Root from "./routes/Root";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
    </Routes>
  );
}