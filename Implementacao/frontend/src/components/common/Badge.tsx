import { BadgeProps, badgeVariants } from "./types";

const badgeSizes = {
  sm: "px-1.5 py-0.5 text-xs",
  md: "px-2 py-1 text-sm",
  lg: "px-2.5 py-1.5 text-base",
};

/** Componente Badge reutilizável */
export default function Badge({
  text,
  variant,
  className = "",
  icon,
  size = "md",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center
        font-medium rounded border
        ${badgeVariants[variant]}
        ${badgeSizes[size]}
        ${className}
      `}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {text}
    </span>
  );
}
