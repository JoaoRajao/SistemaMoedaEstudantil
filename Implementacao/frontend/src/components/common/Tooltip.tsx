import { useState } from "react";
import { TooltipProps } from "./types";

export default function Tooltip({
  content,
  children,
  position = "top",
  className = "",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`
            absolute z-50
            px-2 py-1
            text-sm text-white
            bg-gray-900 rounded shadow-lg
            whitespace-nowrap
            ${positions[position]}
            ${className}
          `}
          role="tooltip"
        >
          {content}
          <div
            className={`
              absolute w-2 h-2
              bg-gray-900
              transform rotate-45
              ${
                position === "top"
                  ? "bottom-[-4px] left-1/2 -translate-x-1/2"
                  : ""
              }
              ${
                position === "right"
                  ? "left-[-4px] top-1/2 -translate-y-1/2"
                  : ""
              }
              ${
                position === "bottom"
                  ? "top-[-4px] left-1/2 -translate-x-1/2"
                  : ""
              }
              ${
                position === "left"
                  ? "right-[-4px] top-1/2 -translate-y-1/2"
                  : ""
              }
            `}
          />
        </div>
      )}
    </div>
  );
}