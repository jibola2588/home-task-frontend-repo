import { ReactNode } from "react";

export interface InputProps {
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
  label?: string | number;
  search?: boolean;
  parentClassName?: string;
}
