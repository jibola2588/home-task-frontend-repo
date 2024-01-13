import { LabelProps } from "@/interface/components/text"; 
import React from "react";

const Label = ({ label, classname, ...rest }: LabelProps) => {
  return (
    <label className={` font-medium text-base ${classname}`} {...rest}>
      {label}
    </label>
  );
};

export default Label;
