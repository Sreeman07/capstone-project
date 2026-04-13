import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://capstone-project.onrender.com"; 

export const useAuth = create((set) => ({
  currentUser: null,
  loading: false,
  isAuthenticated: false,
  error: null,

  // ✅ LOGIN
  login: async (userCred) => {
    try {
      set({
        loading: true,
        currentUser: null,
        isAuthenticated: false,
        error: null,
      });

      const res = await axios.post(
        `${BASE_URL}/auth-api/login`, 
        userCred,
        { withCredentials: true }
      );

      if (res.status === 200) {
        set({
          currentUser: res.data.payload,
          isAuthenticated: true,
          loading: false,
          error: null,
        });
      }
    } catch (err) {
      console.log("Login error:", err);

      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.message || "Login failed", // 
      });
    }
  },

  // ✅ LOGOUT
  logout: async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/auth-api/logout`, // 
        { withCredentials: true }
      );

      if (res.status === 200) {
        set({
          currentUser: null,
          isAuthenticated: false,
          error: null,
          loading: false,
        });
      }
    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.message || "Logout failed", // 
      });
    }
  },

  // ✅ CHECK AUTH (restore session)
  checkAuth: async () => {
    try {
      set({ loading: true });

      const res = await axios.get(
        `${BASE_URL}/auth-api/check-auth`, 
        { withCredentials: true }
      );

      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err) {
      if (err.response?.status === 401) {
        set({
          currentUser: null,
          isAuthenticated: false,
          loading: false,
        });
        return;
      }

      console.error("Auth check failed:", err);
      set({ loading: false });
    }
  },
}));