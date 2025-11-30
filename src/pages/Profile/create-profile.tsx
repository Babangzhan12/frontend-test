import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";

export default function CreateProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    ktpNumber: ""
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.post("/profile", form);

      alert("Profile saved.");
      navigate("/"); 
    } catch (err) {
      console.error(err);
      alert("Failed to save profile.");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Profile</h1>

      <form onSubmit={handleSubmit}>
        <label>Full Name</label><br />
        <input
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        /><br /><br />

        <label>Address</label><br />
        <input
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        /><br /><br />

        <label>Phone Number</label><br />
        <input
          value={form.phoneNumber}
          onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
        /><br /><br />

        <label>KTP Number</label><br />
        <input
          value={form.ktpNumber}
          onChange={(e) => setForm({ ...form, ktpNumber: e.target.value })}
        /><br /><br />

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}
