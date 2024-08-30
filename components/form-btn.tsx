"use client";

import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface BtnProps {
  label: string;
}

export function FormBtn({
  label,
  ...rest
}: BtnProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  return (
    <button
      {...rest}
      className="flex items-center justify-center w-full h-10 rounded-lg bg-orange-400 text-white font-semibold text-sm p-2 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? "Loading..." : label}
    </button>
  );
}
