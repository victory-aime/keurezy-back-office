"use client";

import { createContext, useContext, ReactNode } from "react";
import { AuthContextType } from "../Layout/sidebar/types";
import { SessionResponse } from "better-auth/client";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function isExpired(expiresAt: string | Date): boolean {
  const expirationDate =
    typeof expiresAt === "string" ? new Date(expiresAt) : expiresAt;

  return new Date() >= expirationDate;
}

export function AuthContextProvider({
  children,
  session,
}: {
  children: ReactNode;
  session: SessionResponse | null;
}) {
  if (session?.expiresAt && isExpired(session.expiresAt)) {
  }

  return (
    <AuthContext.Provider
      value={{
        session: session?.session!,
        isLoading: !session?.session,
        user: session?.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
