import { create } from "zustand";
import api from "../services/axios";

interface AuthState {
  user: any;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token"),

  login: async (username, password) => {
    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      set({ token: res.data.token, user: res.data.user });
      return true;
    } catch (err) {
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
