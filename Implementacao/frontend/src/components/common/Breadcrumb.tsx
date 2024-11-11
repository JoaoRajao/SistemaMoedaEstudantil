import { BreadcrumbProps } from "./types";

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
            {item.href ? (
              <a
                href={item.href}
                className={`
                  ml-2 text-sm
                  ${
                    index === items.length - 1
                      ? "text-gray-200 font-medium"
                      : "text-gray-400 hover:text-gray-200"
                  }
                `}
              >
                {item.label}
              </a>
            ) : (
              <span
                className="ml-2 text-sm text-gray-200 font-medium"
                aria-current={index === items.length - 1 ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
