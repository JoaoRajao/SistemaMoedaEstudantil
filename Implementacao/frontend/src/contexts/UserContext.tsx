"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@/types/user";

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const updateUserProfile = async (data: Partial<User>) => {
    if (!currentUser) return;

    try {
      // Atualizar no backend
      const updatedUser = { ...currentUser, ...data };
      setCurrentUser(updatedUser);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, updateUserProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
