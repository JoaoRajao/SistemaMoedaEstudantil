import { BaseFeedbackProps, feedbackVariants } from "./types";

export default function ErrorMessage({
  message,
  description,
  className = "",
  icon,
}: BaseFeedbackProps) {
  return (
    <div
      className={`
        p-4 rounded-lg border
        ${feedbackVariants.error}
        ${className}
      `}
      role="alert"
    >
      <div className="flex items-start">
        {icon || (
          <svg
            className="h-5 w-5 mr-3 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        <div>
          <h3 className="font-medium">{message}</h3>
          {description && (
            <p className="mt-1 text-sm opacity-90">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
