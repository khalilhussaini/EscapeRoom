"use client";
import React from "react";
import Styles from "@/app/styles/escapeRoom.module.css";

type Props = {
  type?: string
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const InputField: React.FC<Props> = ({ type, value, onChange, placeholder, className }) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`${Styles.inputField} ${className}`}
    />
  );
};

export default InputField;
