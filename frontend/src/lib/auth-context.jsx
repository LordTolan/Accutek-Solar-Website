import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { logger } from "@/lib/logger";

const AuthContext = createContext(null);
const STORAGE_KEY = "accutek_admin_token";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function AuthProvider({ children }) {
  // status: "checking" | "authenticated" | "unauthenticated"
  const [status, setStatus] = useState("checking");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY));

  const persistToken = useCallback((t) => {
    if (t) localStorage.setItem(STORAGE_KEY, t);
    else localStorage.removeItem(STORAGE_KEY);
    setToken(t);
  }, []);

  const fetchMe = useCallback(
    async (t) => {
      try {
        const { data } = await axios.get(`${API}/auth/me`, { headers: authHeaders(t) });
        setUser(data);
        setStatus("authenticated");
        return data;
      } catch {
        persistToken(null);
        setUser(null);
        setStatus("unauthenticated");
        return null;
      }
    },
    [persistToken]
  );

  // Initial session check
  useEffect(() => {
    if (!token) {
      setStatus("unauthenticated");
      return;
    }
    fetchMe(token);
  }, [token, fetchMe]);

  const login = useCallback(
    async (email, password) => {
      const { data } = await axios.post(`${API}/auth/login`, { email, password });
      persistToken(data.access_token);
      setUser(data.user);
      setStatus("authenticated");
      return data.user;
    },
    [persistToken]
  );

  const logout = useCallback(async () => {
    try {
      await axios.post(`${API}/auth/logout`, {}, { headers: authHeaders(token) });
    } catch (err) {
      // Server-side logout is best-effort (token is stateless JWT) — log and continue.
      logger.warn("auth: server-side logout failed; clearing local session anyway", err);
    }
    persistToken(null);
    setUser(null);
    setStatus("unauthenticated");
  }, [persistToken, token]);

  const adminFetch = useCallback(
    async (path, options = {}) => {
      const url = `${API}${path}`;
      const headers = { ...authHeaders(token), ...(options.headers || {}) };
      try {
        return await axios({ url, ...options, headers });
      } catch (err) {
        if (err?.response?.status === 401) {
          persistToken(null);
          setUser(null);
          setStatus("unauthenticated");
        }
        throw err;
      }
    },
    [persistToken, token]
  );

  const value = useMemo(
    () => ({ status, user, token, login, logout, adminFetch }),
    [status, user, token, login, logout, adminFetch]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
