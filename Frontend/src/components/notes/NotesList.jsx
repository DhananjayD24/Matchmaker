export default function NotesList({
  notes,
}) {
  return (
    <div className="space-y-3">
      {notes.length === 0 ? (
        <p className="text-gray-500">
          No notes available
        </p>
      ) : (
        notes.map((note, index) => (
          <div
            key={index}
            className="border rounded-lg p-3 bg-slate-50"
          >
            <p>{note.note}</p>
          </div>
        ))
      )}
    </div>
  );
}