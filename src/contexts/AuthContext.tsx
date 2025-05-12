import React, { createContext, useContext, ReactNode } from "react";
import useAdminAuthLogic from "@/hooks/useAdminAuthLogic";

type AuthContextType = ReturnType<typeof useAdminAuthLogic> | null;

const AuthContext = createContext<AuthContextType>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const auth = useAdminAuthLogic();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
