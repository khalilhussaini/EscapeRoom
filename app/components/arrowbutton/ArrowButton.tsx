"use client";
import React from "react";

type Props = {
  onClick?: () => void;
  className?: string;
};

const ArrowButton: React.FC<Props> = ({ onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      ›
    </button>
  );
};

export default ArrowButton;
