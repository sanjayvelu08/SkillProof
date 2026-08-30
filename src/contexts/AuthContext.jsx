import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const ACCOUNTS_KEY = "skillproof_accounts";
const SESSION_KEY = "skillproof_session";

export function useAuth() {
  return useContext(AuthContext);
}

function getAccounts() {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
  } catch {
    return null;
  }
}

function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (session) setUser(session);
    setLoading(false);
  }, []);

  async function signUp(email, password) {
    const accounts = getAccounts();
    const exists = accounts.some(
      (a) => a.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) {
      return { data: null, error: { message: "An account with this email already exists." } };
    }

    const newAccount = { email, password, name: null, createdAt: Date.now() };
    accounts.push(newAccount);
    saveAccounts(accounts);

    return { data: { user: { email } }, error: null };
  }

  async function signIn(email, password) {
    const accounts = getAccounts();
    const account = accounts.find(
      (a) => a.email.toLowerCase() === email.toLowerCase()
    );

    if (!account) {
      return { data: null, error: { message: "No account found with this email. Please sign up first." } };
    }

    if (account.password !== password) {
      return { data: null, error: { message: "Incorrect password. Please try again." } };
    }

    const sessionUser = { email: account.email, name: account.name || null };
    saveSession(sessionUser);
    setUser(sessionUser);

    return { data: { user: sessionUser }, error: null };
  }

  function updateName(name) {
    // Update session
    const updated = { ...user, name };
    saveSession(updated);
    setUser(updated);

    // Also update the stored account
    const accounts = getAccounts();
    const idx = accounts.findIndex(
      (a) => a.email.toLowerCase() === user.email.toLowerCase()
    );
    if (idx !== -1) {
      accounts[idx].name = name;
      saveAccounts(accounts);
    }
  }

  async function signOut() {
    clearSession();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, updateName }}>
      {children}
    </AuthContext.Provider>
  );
}
