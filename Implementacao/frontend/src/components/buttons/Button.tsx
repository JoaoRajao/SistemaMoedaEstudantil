import { BaseButtonProps, buttonVariants, baseButtonStyles } from "./types";

export default function Button({
  variant = "primary",
  isLoading = false,
  children,
  className = "",
  leftIcon,
  rightIcon,
  disabled,
  ...props
}: BaseButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`
        ${baseButtonStyles}
        ${buttonVariants[variant]}
        ${className}
        ${isLoading ? "cursor-wait" : ""}
        inline-flex items-center justify-center
      `}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}
