import { useState } from "react";
import { apiFetch } from "./api";
import { Link, useNavigate } from "react-router-dom";

export default function Registe() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister() {
    setError(null);
    setLoading(true);
    if (email.trim() === "" || password.trim() === "") {
      setError("Email and password are required");
      setLoading(false);
      return;
    }
    try {
      const data = await apiFetch("/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      console.log(data);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className=" max-w-sm mx-auto mt-16">
        <h1 className=" text-2xl font-semibold mb-6">Register</h1>
        <label>
          Email:
          <input
            type="text"
            className="w-full mb-4 px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            className="w-full mb-4 px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {loading && <h2>loading...</h2>}
        {error && <h2 className="text-sm text-red-600">{error}</h2>}
        <button
          className=" w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleRegister}
        >
          Register
        </button>
        <small>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-800 font-bold">
            Log in
          </Link>
        </small>
      </div>
    </>
  );
}
