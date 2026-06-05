import { useState } from "react";

export default function AddNoteForm({
  onAdd,
}) {
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!note.trim()) return;

    onAdd(note);

    setNote("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3"
    >
      <textarea
        value={note}
        onChange={(e) =>
          setNote(e.target.value)
        }
        placeholder="Add note..."
        rows={4}
        className="w-full border rounded-lg p-3"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
      >
        Add Note
      </button>
    </form>
  );
}