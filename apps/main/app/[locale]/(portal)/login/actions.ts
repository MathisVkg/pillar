"use server";

import { signIn } from "@/lib/auth";
import { prisma } from "@pillar/database";
import { redirect } from "next/navigation";

export async function portalLogin(
  _prev: { error: string } | undefined,
  formData: FormData
): Promise<{ error: string } | undefined> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const locale = (formData.get("locale") as string) || "fr";

  try {
    await signIn("portal", { email, password, redirect: false });
  } catch (err) {
    if (err instanceof Error && err.message.includes("CredentialsSignin")) {
      return { error: "Invalid email or password." };
    }
    throw err;
  }

  // Look up the client slug so we can redirect directly to their portal
  const user = await prisma.clientUser.findUnique({
    where: { email },
    select: { client: { select: { slug: true } } },
  });

  const slug = user?.client?.slug;
  redirect(slug ? `/${locale}/portal/${slug}` : `/${locale}/portal`);
}
