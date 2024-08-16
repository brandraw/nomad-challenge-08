"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";

const PasswordRegex = /^(?=.*\d).+$/;

const formSchema = z.object({
  username: z.string().min(5).max(10).trim().toLowerCase(),
  // .refine(async (username) => {
  //   const user = await db.user.findUnique({
  //     where: {
  //       username,
  //     },
  //     select: {
  //       id: true,
  //     },
  //   });

  //   return Boolean(user);
  // }, "Username Not Found")
  email: z
    .string()
    .email()
    .refine((email) => email.includes("@zod.com"), "Not Zexy Zod"),
  // .refine(async (email) => {
  //   const user = await db.user.findUnique({
  //     where: {
  //       email,
  //     },
  //     select: {
  //       id: true,
  //     },
  //   });

  //   return Boolean(user);
  // }, "Email Not Found")
  password: z
    .string()
    .min(10)
    .regex(PasswordRegex, "Password should contain at least one number"),
});
// .superRefine(async ({ email, password }, ctx) => {
//   const user = await db.user.findUnique({
//     where: {
//       email,
//     },
//     select: {
//       password: true,
//     },
//   });

//   const checkPassword = await bcrypt.compare(password, user?.password || "");
//   if (!checkPassword) {
//     ctx.addIssue({
//       code: "custom",
//       message: "Wrong password",
//       path: ["password"],
//       fatal: true,
//     });

//     return z.NEVER;
//   }
// });

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

  const user = await db.user.findUnique({
    where: {
      username: result.data.username,
    },
    select: {
      password: true,
    },
  });

  return {
    success: result.success,
  };
}
