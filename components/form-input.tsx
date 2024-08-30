"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface InputProps {
  label?: string;
  name: string;
  errors?: string[];
}

export const FormInput = forwardRef<
  HTMLInputElement,
  InputProps & InputHTMLAttributes<HTMLInputElement>
>(({ label, name, errors = [], ...rest }, ref) => {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-sm">
          {label}
        </label>
      )}
      <input
        {...rest}
        name={name}
        id={name}
        disabled={pending}
        className={`border rounded-md py-2 px-3 placeholder:text-sm outline-none focus:border-orange-400 ${
          errors.length !== 0 ? "border-red-500" : ""
        }`}
        ref={ref}
      />
      {errors.map((a, i) => (
        <div key={i} className="text-xs text-red-500">
          {a}
        </div>
      ))}
    </div>
  );
});

FormInput.displayName = "FormInput";
