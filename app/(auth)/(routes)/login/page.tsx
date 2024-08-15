"use client";

import { FormBtn } from "@/components/form-btn";
import { FormInput } from "@/components/form-input";
import { useFormState } from "react-dom";
import { handleLogin } from "./actions";

export default function SignIn() {
  const [state, action] = useFormState(handleLogin, null);

  return (
    <div className="space-y-4">
      <h1 className="font-bold text-2xl">Sign In</h1>
      <form action={action} className="space-y-3">
        <FormInput
          placeholder="Email"
          name="email"
          type="email"
          required
          errors={state?.errors?.fieldErrors.email}
        />
        <FormInput
          placeholder="Username"
          name="username"
          type="text"
          required
          errors={state?.errors?.fieldErrors.username}
        />
        <FormInput
          placeholder="********"
          name="password"
          type="password"
          required
          errors={state?.errors?.fieldErrors.password}
        />
        <FormBtn label="Login" />
      </form>

      {state?.success && (
        <div className="rounded-lg bg-green-500 flex items-center justify-center h-10 p-2">
          Success!
        </div>
      )}
    </div>
  );
}
