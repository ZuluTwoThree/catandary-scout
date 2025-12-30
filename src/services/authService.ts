export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthSession {
  user: AuthUser;
  accessToken: string;
}

const STORAGE_KEY = "catandary-session";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getStoredSession = (): AuthSession | null => {
  const storedSession = localStorage.getItem(STORAGE_KEY);
  if (!storedSession) {
    return null;
  }

  try {
    const parsed = JSON.parse(storedSession) as AuthSession;
    return parsed;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const signIn = async (
  email: string,
  password: string
): Promise<{ session: AuthSession | null; error: Error | null }> => {
  try {
    await delay(500);

    if (password.length < 6) {
      return { session: null, error: new Error("Invalid credentials") };
    }

    const session: AuthSession = {
      user: { id: crypto.randomUUID(), email },
      accessToken: "mock-token",
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return { session, error: null };
  } catch (error) {
    return { session: null, error: error as Error };
  }
};

export const signUp = async (
  email: string,
  password: string
): Promise<{ session: AuthSession | null; error: Error | null }> => {
  try {
    await delay(500);

    if (password.length < 6) {
      return { session: null, error: new Error("Password must be at least 6 characters") };
    }

    const session: AuthSession = {
      user: { id: crypto.randomUUID(), email },
      accessToken: "mock-token",
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return { session, error: null };
  } catch (error) {
    return { session: null, error: error as Error };
  }
};

export const signOut = async (): Promise<void> => {
  localStorage.removeItem(STORAGE_KEY);
};
