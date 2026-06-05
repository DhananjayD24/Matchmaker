import { useState } from "react";

export default function EmailModal({
  match,
  customer,
  emailContent,
  onClose,
  onSend,
  isSending,
}) {
  const [editedEmail, setEditedEmail] = useState(emailContent || "");
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    try {
      await onSend(editedEmail);
      setSent(true);
      setTimeout(() => {
        onClose();
        setSent(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  if (!match) return null;

  if (sent) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-8 w-full max-w-md text-center">
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Match Sent Successfully!
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            Email introduction has been sent to both{" "}
            <span className="font-semibold">{customer.firstName}</span> and{" "}
            <span className="font-semibold">{match.firstName}</span>.
          </p>
          <p className="text-xs text-slate-500">
            They will receive a notification to review the match.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">Match Email</h2>
            <p className="text-sm text-slate-500 mt-1">
              Review and edit the match introduction email
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Email Content
            </label>
            <textarea
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              rows={12}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Note:</span> This email will be
              sent to both {customer.firstName} and {match.firstName}. They will
              use it to decide on next steps for connection.
            </p>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md px-4 py-2 border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={isSending || !editedEmail.trim()}
            className="rounded-md bg-emerald-600 text-white px-4 py-2 text-sm font-semibold hover:bg-emerald-700 disabled:opacity-60 disabled:pointer-events-none"
          >
            {isSending ? "Sending..." : "Send Match Email"}
          </button>
        </div>
      </div>
    </div>
  );
}
