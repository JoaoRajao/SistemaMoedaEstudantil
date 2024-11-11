import Button from "./Button";
import { BaseButtonProps } from "./types";

export default function SecondaryButton(
  props: Omit<BaseButtonProps, "variant">
) {
  return <Button variant="secondary" {...props} />;
}
