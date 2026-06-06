export default function NotesList({ notes }) {
  const formattedNotes = notes.map((note) => note.note?.trim()).filter(Boolean);

  return (
    <div className="text-sm leading-7 text-slate-700">
      {formattedNotes.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-500">
          No notes have been added yet.
        </div>
      ) : (
        <p className="rounded-3xl border border-slate-200 bg-white p-4 text-slate-700 shadow-sm">
          {formattedNotes.join(", ")}
        </p>
      )}
    </div>
  );
}
