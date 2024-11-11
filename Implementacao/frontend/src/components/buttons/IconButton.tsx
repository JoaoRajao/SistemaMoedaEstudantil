import { BaseButtonProps, buttonVariants, baseButtonStyles } from "./types";

interface IconButtonProps extends Omit<BaseButtonProps, "children"> {
  /** Ícone do botão */
  icon: React.ReactNode;
  /** Texto alternativo para acessibilidade */
  ariaLabel: string;
  /** Tamanho do botão */
  size?: "sm" | "md" | "lg";
}

export default function IconButton({
  icon,
  ariaLabel,
  variant = "primary",
  size = "md",
  className = "",
  isLoading,
  disabled,
  ...props
}: IconButtonProps) {
  const sizeClasses = {
    sm: "p-1",
    md: "p-2",
    lg: "p-3",
  };

  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled || isLoading}
      className={`
        ${baseButtonStyles}
        ${buttonVariants[variant]}
        ${sizeClasses[size]}
        rounded-full
        ${className}
        ${isLoading ? "cursor-wait" : ""}
        inline-flex items-center justify-center
      `}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
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
      ) : (
        icon
      )}
    </button>
  );
}
