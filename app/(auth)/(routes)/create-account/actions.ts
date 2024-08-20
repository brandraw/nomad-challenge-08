"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { UserLogin } from "@/lib/user-login";
import { redirect } from "next/navigation";

const formSchema = z
  .object({
    username: z
      .string()
      .min(3)
      .max(10)
      .trim()
      .toLowerCase()
      .refine(async (username) => {
        const user = await db.user.findUnique({
          where: {
            username,
          },
          select: {
            id: true,
          },
        });
        return !Boolean(user);
      }, "Username Already Exists"),
    email: z
      .string()
      .email()
      .refine(async (email) => {
        const user = await db.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
          },
        });
        return !Boolean(user);
      }, "Email Already Exists"),
    password: z.string(),
    password_confirm: z.string(),
  })
  .refine(({ password, password_confirm }) => password === password_confirm, {
    message: "Not Same",
    path: ["password_confirm"],
  });

export async function handleSignup(_: any, formData: FormData) {
  await new Promise((r) => setTimeout(r, 500));

  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    password_confirm: formData.get("password_confirm"),
  };

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  }

  const hashedPassword = await bcrypt.hash(result.data.password, 12);
  const user = await db.user.create({
    data: {
      username: result.data.username,
      email: result.data.email,
      password: hashedPassword || "",
    },
    select: {
      id: true,
    },
  });

  await UserLogin(user.id);

  redirect("/profile");
}
