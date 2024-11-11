import { BaseFeedbackProps, feedbackVariants } from "./types";

export default function SuccessMessage({
  message,
  description,
  className = "",
  icon,
}: BaseFeedbackProps) {
  return (
    <div
      className={`
        p-4 rounded-lg border
        ${feedbackVariants.success}
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
              d="M5 13l4 4L19 7"
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
