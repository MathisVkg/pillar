"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function portalLogin(
  _prev: { error: string } | { success: true } | undefined,
  formData: FormData
): Promise<{ error: string } | { success: true } | undefined> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("portal", { email, password });
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: "Invalid email or password." };
    }
    throw err;
  }

  return { success: true };
}
