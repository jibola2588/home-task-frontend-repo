import { ParagraphProps } from "@/interface/components/text";
import React from "react";

const Paragraph = ({ label, bold, classname }: ParagraphProps) => {
  return (
    <p
      className={`${
        bold ? "font-bold " : "font-normal "
      } text-paragraph ${classname}`}
    >
      {label}
    </p>
  );
};

export default Paragraph;
