"use client";

import React, { ButtonHTMLAttributes, ReactElement } from "react";
import { ButtonProp } from "@/interface/components/button";
import Icon from "../icon";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Button = (
  props: ButtonProp & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const {
    loading,
    label,
    size = "medium",
    isrounded,
    color,
    icon,
    iconLeft,
    iconright,
    bold,
    customclassname,
  } = props;
  return (
    <button
      disabled={loading}
      className={` w-full ${
        iconright || iconLeft || icon
          ? " flex items-center justify-center gap-x-8"
          : ""
      } ${isrounded ? "rounded-full" : "rounded-lg"} ${
        size === "small"
          ? "text-[14px] px-4 py-2"
          : size === "none"
          ? ""
          : size === "large"
          ? "text-base px-6 py-4"
          : "text-sm lg:text-base font-normal px-3 lg:px-5 py-3 lg:py-[17px]"
      }
      ${customclassname}
      ${
        color === "primary"
          ? "bg-primary500 text-white"
          : color === "black"
          ? "bg-black text-white"
          : color === "white"
          ? "bg-white border border-[#DEE3E9]"
          : color === 'danger' ? 
          "bg-red-600 text-white py-2 px-3 text-center":
          "bg-secondary"
      }`}
      {...props}
    >
      <span>{iconLeft}</span>

      {!icon ? (
        <>
          {!loading ? (
            <span
              className={` ${
                bold && "font-semibold"
              } text-center block break-normal`}
            >
              {label}
            </span>
          ) : (
            <Icon
              icon={AiOutlineLoading3Quarters}
              className="loading-animation another-css text-2xl new-css"
            />
          )}
        </>
      ) : (
        <div className="w-min self-center block">{icon}</div>
      )}
      <span>{iconright}</span>
    </button>
  );
};
export default Button;
