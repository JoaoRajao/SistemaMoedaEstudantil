"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { SystemNotification } from "@/types/notification";

interface NotificationContextType {
  notifications: SystemNotification[];
  addNotification: (notification: SystemNotification) => void;
  removeNotification: (index: number) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<SystemNotification[]>([]);

  const addNotification = (notification: SystemNotification) => {
    setNotifications((prev) => [...prev, notification]);
    if (notification.duration) {
      setTimeout(() => {
        removeNotification(notifications.length);
      }, notification.duration);
    }
  };

  const removeNotification = (index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
