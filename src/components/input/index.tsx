"use client";

import { InputProps } from "@/interface/components/input";
import React, { FC, InputHTMLAttributes, ReactNode } from "react";

const Input: FC<InputProps & InputHTMLAttributes<HTMLInputElement>> = ({
  label,
  leading,
  className,
  trailing,
  search,
  parentClassName,
  ...props
}) => {
  return (
    <div
      className={`${parentClassName} flex items-center border-[2px] gap-2 border-borderGray rounded-md relative focus-within:border-2 focus-within:border-secondary ${
        search ? "rounded-full" : ""
      }`}
    >
      <input
        className={`peer w-full border-none outline-none bg-transparent pt-5 pb-2 px-4  ${
          trailing ? "pr-8" : ""
        } ${leading ? "pl-10" : ""}
        ${search ? "bg-secondaryGrey rounded-full" : ""}`}
        {...props}
        placeholder=" "
      />
      <label className="pointer-events-none absolute left-4 peer-focus:leading-[1] top-1 transition-all peer-placeholder-shown:text-[16px] text-xs peer-focus:text-xs peer-placeholder-shown:leading-[2.8] text-black/60">
        {label}
      </label>
      {leading && (
        <div className="left-4 absolute bottom-2 peer-placeholder-shown:invisible  peer-focus:visible visible">
          {leading}
        </div>
      )}
      {trailing && <div className="right-4 absolute">{trailing}</div>}
    </div>
  );
};

export default Input;
