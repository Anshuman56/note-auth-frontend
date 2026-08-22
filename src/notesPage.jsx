import { useEffect, useState } from "react";
import { apiFetch } from "./api";
import { clearToken } from "./auth";
import { useNavigate } from "react-router-dom";

export default function NotesPase() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [note, setNote] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editNote, setEditNote] = useState("");
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

  async function handleAddNote() {
    if (note.trim() === "") {
      setError("Input field empty");
      return;
    }
    try {
      const data = await apiFetch("/notes", {
        method: "post",
        body: JSON.stringify({ note }),
      });
      setNotes(data);
      setNote("");
      setError(null);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleDelet(id) {
    const warning = window.confirm("Delete this note?");
    if (warning) {
      try {
        const data = await apiFetch(`/notes/${id}`, {
          method: "delete",
        });
        setNotes(data);
      } catch (err) {
        console.log(err.message);
      }
    }
  }
  function handleEdit(item) {
    setEditingId(item._id);
    setEditNote(item.title);
  }
  function handleCancel() {
    setEditingId(null);
    setEditNote("");
    setError(null);
  }
  async function handleSave(id) {
    if (editNote.trim() === "") {
      setError("Note cannot be empty");
      return;
    }
    try {
      const data = await apiFetch(`/notes/${id}`, {
        method: "put",
        body: JSON.stringify({ note: editNote }),
      });
      setNotes(data);
      setEditingId(null);
      setEditNote("");
      setError(null);
    } catch (err) {
      console.error(err.message);
    }
  }
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center w-full mb-5">
        <h1 className="text-2xl font-semibold">My Notes</h1>
        <button
          className=" text-sm text-gray-600 hover:text-gray-900  cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className=" flex gap-2 items-end mb-2">
        <label htmlFor="note" className="flex-1">
          Note
          <textarea
            className="w-full p-3 border rounded resize-none"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            name=""
            id=""
          ></textarea>
        </label>
        <button
          className=" py-6.5 px-3 mb-1 bg-blue-600 text-white rounded hover:bg-blue-800 cursor-pointer"
          onClick={handleAddNote}
        >
          Add note
        </button>
      </div>
      {loading && <h2>loading...</h2>}
      {error && <h2 className="text-red-400">{error}</h2>}
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
                  {editingId === item._id ? (
                    <>
                      <textarea
                        name=""
                        id=""
                        className="w-full p-3 border rounded resize-none"
                        value={editNote}
                        onChange={(e) => setEditNote(e.target.value)}
                      ></textarea>
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          className="px-3 py-2 bg-blue-600 text-white rounded cursor-pointer"
                          onClick={() => handleSave(item._id)}
                        >
                          Save
                        </button>
                        <button
                          className="px-3 py-2 border rounded cursor-pointer"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {item.title}
                      <br />
                      <span className="text-xs text-gray-500 mt-2">
                        {item.createdAt}
                      </span>
                      <button
                        className="text-xs ml-2 cursor-pointer text-red-600 hover:text-red-800"
                        onClick={() => handleDelet(item._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="text-xs ml-2 cursor-pointer text-blue-600 hover:text-blue-800"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
