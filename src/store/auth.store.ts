import { create } from "zustand";
import api from "../services/axios";

interface AuthState {
  user: any;
  token: string | null;
  refreshToken: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: any) => void;
}

export const useAuth = create<AuthState>((set,get) => ({
  user: null,
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  login: async (username, password) => {
    try {
      const res = await api.post("/auth/login", { username, password });
      const { token, refreshToken, user } = res.data;
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("token", token);
      localStorage.setItem("pinUnlocked", "true");
       set({
        token,
        refreshToken,
        user,
      });
      console.debug("Auth login success:", { token, refreshToken, user });
      return true;
    } catch (err) {
      return false;
    }
  },

  refresh: async () => {
    try {
      const refreshToken = get().refreshToken;
      if (!refreshToken) return false;

      const res = await api.post("/auth/refresh-token", { refreshToken });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      set({
        token: res.data.token,
        refreshToken: res.data.refreshToken || refreshToken,
      });

      return true;
    } catch {
      return false;
    }
  },

   setUser: (user) => set({ user }), 

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("pinUnlocked");
    set({ user: null, token: null });
  },
}));
