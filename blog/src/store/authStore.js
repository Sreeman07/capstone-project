import { create } from "zustand";
import axios from "axios";

const API = axios.create({
  baseURL: "https://capstone-project-je9l.onrender.com",
  withCredentials: true,
});

export const useAuth = create((set) => ({
  currentUser: null,
  loading: false,
  isAuthenticated: false,
  error: null,

  login: async (userCred) => {
    try {
      set({ loading: true, error: null });

      const res = await API.post("/auth-api/login", userCred);

      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
      });

    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.message || "Login failed",
      });
    }
  },

  logout: async () => {
    await API.get("/auth-api/logout");

    set({
      currentUser: null,
      isAuthenticated: false,
    });
  },

  checkAuth: async () => {
    try {
      const res = await API.get("/auth-api/check-auth");

      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
      });

    } catch {
      set({
        currentUser: null,
        isAuthenticated: false,
      });
    }
  },
}));