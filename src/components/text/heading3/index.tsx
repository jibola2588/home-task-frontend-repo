import { Heading3Props } from "@/interface/components/text"; 
import React from "react";

const Heading3 = ({ label, bold, classname }: Heading3Props) => {
  return (
    <h3
      className={`${
        bold && "font-bold"
      } font-semibold text-[24px] ${classname}`}
    >
      {label}
    </h3>
  );
};

export default Heading3;
