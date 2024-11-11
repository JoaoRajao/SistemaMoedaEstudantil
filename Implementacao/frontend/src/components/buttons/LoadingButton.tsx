import Button from "./Button";
import { BaseButtonProps } from "./types";

interface LoadingButtonProps extends BaseButtonProps {
  /** Texto mostrado durante o carregamento */
  loadingText?: string;
}

export default function LoadingButton({
  children,
  loadingText,
  isLoading = false,
  ...props
}: LoadingButtonProps) {
  return (
    <Button isLoading={isLoading} {...props}>
      {isLoading ? loadingText || "Carregando..." : children}
    </Button>
  );
}
