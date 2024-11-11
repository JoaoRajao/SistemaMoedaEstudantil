"use client";

import { createContext, useContext, ReactNode } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import EmptyState from "./EmptyState";

interface FeedbackContextType {
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  showSuccess: (message: string, description?: string) => void;
  showError: (message: string, description?: string) => void;
  showEmpty: (props: {
    title: string;
    description?: string;
    action?: ReactNode;
  }) => void;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined
);

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error("useFeedback must be used within a FeedbackProvider");
  }
  return context;
}

export default function FeedbackProvider({
  children,
}: {
  children: ReactNode;
}) {
  const showLoading = (message = "Carregando...") => {
    toast.info(
      <div className="flex items-center space-x-2">
        <LoadingSpinner size="sm" />
        <span>{message}</span>
      </div>,
      { autoClose: false }
    );
  };

  const hideLoading = () => {
    toast.dismiss();
  };

  const showSuccess = (message: string, description?: string) => {
    toast.success(
      <SuccessMessage message={message} description={description} />,
      { position: "top-right" }
    );
  };

  const showError = (message: string, description?: string) => {
    toast.error(<ErrorMessage message={message} description={description} />, {
      position: "top-right",
    });
  };

  const showEmpty = ({
    title,
    description,
    action,
  }: {
    title: string;
    description?: string;
    action?: ReactNode;
  }) => {
    return (
      <EmptyState title={title} description={description} action={action} />
    );
  };

  const value = {
    showLoading,
    hideLoading,
    showSuccess,
    showError,
    showEmpty,
  };

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
}
