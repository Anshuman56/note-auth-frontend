import { BrowserRouter, Route, Routes } from "react-router-dom";
import { apiFetch } from "./api";
import Registe from "./register";
import Login from "./login";
import RequireAuth from "./requireAuth";

// no token, hit your public endpoint
const data = await apiFetch("/");
console.log(data);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registe />} />
        <Route
          path="/notes"
          element={
            <RequireAuth>
              <h1>Notes</h1>
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
