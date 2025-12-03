import { useEffect, useState } from "react";
import { TextInput, Button, Paper } from "@mantine/core";
import api from "../../services/axios";
import { useAuth } from "../../store/auth.store";
import { Loader } from "@mantine/core";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>({
    fullName: "",
    address: "",
    phoneNumber: "",
    ktpNumber: "",
  });

  const user = useAuth((s) => s.user);
  const profileId = user?.profile?.profileId;

  const loadProfile = async () => {
  setLoading(true);
  try {
    const res = await api.get(`/profile/${profileId}`);
    const p = res.data.data;

    setProfile({
      fullName: p.fullName,
      address: p.address,
      phoneNumber: p.phoneNumber,
      ktpNumber: p.ktpNumber,
    });
  } finally {
    setLoading(false);
  }
};

  const saveProfile = async () => {
    setSaving(true);
    try {
      await api.put(`/profile/${profileId}`, profile);
      alert("Profile updated!");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f7f9fc"
    }}>
      <Loader size="lg" color="blue" />
    </div>
  );
}

  return (
    <div style={{ padding: "20px" }}>
      <Paper
        p="lg"
        shadow="sm"
        radius="md"
        style={{
          background: "white",
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          marginTop: 20,
        }}
      >
        <h2 style={{ marginTop: 0 }}>Profile</h2>

        <TextInput
          label="Full Name"
          value={profile.fullName}
          onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
          mt="md"
        />

        <TextInput
          label="Address"
          value={profile.address}
          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
          mt="md"
        />

        <TextInput
          label="Phone Number"
          value={profile.phoneNumber}
          onChange={(e) =>
            setProfile({ ...profile, phoneNumber: e.target.value })
          }
          mt="md"
        />

        <TextInput
          label="KTP Number"
          value={profile.ktpNumber}
          onChange={(e) =>
            setProfile({ ...profile, ktpNumber: e.target.value })
          }
          mt="md"
        />

        <Button fullWidth mt="lg" onClick={saveProfile} loading={saving}>
          Save Changes
        </Button>
      </Paper>
    </div>
  );
}
