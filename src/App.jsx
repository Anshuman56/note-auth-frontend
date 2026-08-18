import { BrowserRouter, Route, Routes } from "react-router-dom";
import { apiFetch } from "./api";
import Registe from "./register";

// no token, hit your public endpoint
const data = await apiFetch("/");
console.log(data);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/register" element={<Registe />} />
        <Route path="/notes" element={<h1>Notes</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
