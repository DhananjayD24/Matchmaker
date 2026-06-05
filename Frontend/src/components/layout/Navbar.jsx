import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <div className="bg-white border-b h-16 px-6 flex items-center justify-between">
      <input
        placeholder="Search customers..."
        className="border px-4 py-2 rounded-lg w-80"
      />

      <div className="font-medium">
        {user?.name}
      </div>
    </div>
  );
}