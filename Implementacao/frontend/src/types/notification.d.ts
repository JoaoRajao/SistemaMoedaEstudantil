export interface EmailNotification {
  to: string;
  subject: string;
  body: string;
  attachments?: Array<{
    filename: string;
    content: string;
  }>;
}

export interface SystemNotification {
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
}
