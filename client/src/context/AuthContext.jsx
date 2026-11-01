import { createContext, useContext, useEffect, useState, useCallback } from "react";
import API from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const login = useCallback((newToken, newUser) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  const register = useCallback(
    async ({ name, email, password }) => {
      const res = await API.post("/auth/register", { name, email, password });
      login(res.data.token, res.data.user);
      return res.data;
    },
    [login]
  );

  const signIn = useCallback(
    async ({ email, password }) => {
      const res = await API.post("/auth/login", { email, password });
      login(res.data.token, res.data.user);
      return res.data;
    },
    [login]
  );

  return (
    <AuthContext.Provider
      value={{ user, token, ready, isAuthenticated: Boolean(token), login, logout, register, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
