"use client";
import React from "react";
import Styles from "@/app/styles/escapeRoom.module.css";

type RequiredProps = {
  label: string;
};

type OptionalProps = {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const Button: React.FC<RequiredProps & OptionalProps> = ({
  disabled,
  label,
  onClick,
  className,
}) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`${Styles.button} ${className}`}>
      {label}
    </button>
  );
};

export default Button;
