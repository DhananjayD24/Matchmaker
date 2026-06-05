export default function CustomerTabs({
  genderTab,
  setGenderTab,
  verificationTab,
  setVerificationTab,
}) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          onClick={() => setGenderTab("male")}
          className={`px-5 py-2 rounded-lg ${
            genderTab === "male"
              ? "bg-blue-600 text-white"
              : "bg-white"
          }`}
        >
          Men
        </button>

        <button
          onClick={() => setGenderTab("female")}
          className={`px-5 py-2 rounded-lg ${
            genderTab === "female"
              ? "bg-blue-600 text-white"
              : "bg-white"
          }`}
        >
          Women
        </button>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() =>
            setVerificationTab("verified")
          }
          className={`px-4 py-2 rounded-lg ${
            verificationTab === "verified"
              ? "bg-green-600 text-white"
              : "bg-white"
          }`}
        >
          Verified
        </button>

        <button
          onClick={() =>
            setVerificationTab("nonVerified")
          }
          className={`px-4 py-2 rounded-lg ${
            verificationTab === "nonVerified"
              ? "bg-red-600 text-white"
              : "bg-white"
          }`}
        >
          Non Verified
        </button>
      </div>
    </div>
  );
}