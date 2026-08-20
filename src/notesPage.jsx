import { useEffect, useState } from "react";
import { apiFetch } from "./api";
import { clearToken } from "./auth";
import { useNavigate } from "react-router-dom";

export default function NotesPase() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigator = useNavigate();
  useEffect(() => {
    async function feachNotes() {
      setLoading(true);
      setError(null);
      try {
        const data = await apiFetch("/notes");
        setNotes(data);
      } catch (err) {
        if (err.status === 401) {
          clearToken();
          navigator("/login");
          return;
        }

        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    feachNotes();
  }, [navigator]);
  function handleLogout() {
    clearToken();
    navigator("/login");
  }
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center w-full mb-5">
        <h1 className="text-2xl font-semibold">My Notes</h1>
        <button
          className=" text-sm text-gray-600 hover:text-gray-900"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      {loading && <h2>loading...</h2>}
      {error && <h2>{error}</h2>}
      {notes && (
        <div>
          {notes.length === 0 ? (
            <h2>There are no notes yet</h2>
          ) : (
            <ul>
              {notes.map((item) => (
                <li
                  className="bg-white border rounded p-4 mb-3 text-base"
                  key={item._id}
                >
                  {item.title}
                  <br />
                  <span className="text-xs text-gray-500 mt-2">
                    {item.createdAt}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
