import { ReactElement } from "react";

export interface ButtonProp {
  loading?: boolean;
  label?: string;
  size?: "small" | "medium" | "large" | "none";
  isrounded?: boolean;
  color?: "primary" | "black" | "white" | "danger";
  icon?: ReactElement;
  iconright?: ReactElement;
  iconLeft?: ReactElement;
  bold?: boolean;
  customclassname?: string;
}
