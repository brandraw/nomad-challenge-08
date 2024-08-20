"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { UserLogin } from "@/lib/user-login";
import { redirect } from "next/navigation";

const PasswordRegex = /^(?=.*\d).+$/;

const formSchema = z
  .object({
    email: z.string().toLowerCase().email(),
    password: z.string().min(1),
  })
  .superRefine(async ({ email, password }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      ctx.addIssue({
        code: "custom",
        message: "Email Not Exists",
        path: ["email"],
        fatal: true,
      });

      return z.NEVER;
    }

    const checkPassword = await bcrypt.compare(password, user?.password || "");
    if (!checkPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Wrong password",
        path: ["password"],
        fatal: true,
      });

      return z.NEVER;
    }

    await UserLogin(user.id);

    redirect("/profile");
  });

export async function handleLogin(_: any, formData: FormData) {
  await new Promise((r) => setTimeout(r, 500));

  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return {
      errors: result.error.flatten(),
    };
  }

  return {
    success: result.success,
  };
}
