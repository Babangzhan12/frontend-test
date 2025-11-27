import { useEffect, useState } from "react";
import { TextInput, Button, Paper } from "@mantine/core";
import api from "../../services/axios";

export default function Profile() {
  const [profile, setProfile] = useState<any>({
    fullName: "",
    address: "",
    phoneNumber: "",
    ktpNumber: "",
  });

  const loadProfile = async () => {
    const res = await api.get("/profile/me");
    setProfile(res.data);
  };

  const saveProfile = async () => {
    await api.put("/profile", profile);
    alert("Profile updated!");
  };

  useEffect(() => {
    loadProfile();
  }, []);

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

        <Button fullWidth mt="lg" onClick={saveProfile}>
          Save Changes
        </Button>
      </Paper>
    </div>
  );
}
