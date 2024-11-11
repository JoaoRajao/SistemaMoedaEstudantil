import Button from "./Button";
import { BaseButtonProps } from "./types";

export default function PrimaryButton(props: Omit<BaseButtonProps, "variant">) {
  return <Button variant="primary" {...props} />;
}
