// src/components/AdminGate.jsx
import { useState } from "react";

const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN ?? "letmein"; // 🚨 not real security, just a guard for now

const AdminGate = ({ onUnlock }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin.trim() === ADMIN_PIN) {
      setError("");
      setPin("");
      onUnlock();
    } else {
      setError("Incorrect admin passphrase.");
    }
  };

  return (
    <div className="admin-gate">
      <h2>Admin Access</h2>
      <p className="admin-gate-desc">
        This area is for quiz management (adding, editing, and deleting
        questions).
      </p>
      <form onSubmit={handleSubmit} className="admin-gate-form">
        <label>
          Admin passphrase
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            autoComplete="off"
          />
        </label>
        {error && <p className="feedback feedback--wrong">{error}</p>}
        <button type="submit" className="next-btn">
          Enter
        </button>
      </form>
    </div>
  );
};

export default AdminGate;
