"use client";

import { FormBtn } from "@/components/form-btn";
import { FormInput } from "@/components/form-input";
import { useFormState } from "react-dom";
import { handleSignup } from "./actions";

export default function SignUp() {
  const [state, action] = useFormState(handleSignup, null);

  return (
    <div className="space-y-4">
      <h1 className="font-bold text-2xl">Sign Up</h1>
      <form action={action} className="space-y-3">
        <FormInput
          placeholder="Email"
          name="email"
          type="email"
          required
          errors={state?.fieldErrors.email}
        />
        <FormInput
          placeholder="Username"
          name="username"
          type="text"
          required
          errors={state?.fieldErrors.username}
        />
        <FormInput
          placeholder="Password"
          name="password"
          type="password"
          required
          errors={state?.fieldErrors.password}
        />
        <FormInput
          placeholder="Password Confirm"
          name="password_confirm"
          type="password"
          required
          errors={state?.fieldErrors.password_confirm}
        />
        <FormBtn label="Login" />
      </form>
    </div>
  );
}
