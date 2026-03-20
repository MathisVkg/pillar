import { auth } from "@/lib/auth";
import { prisma } from "@pillar/database";
import { redirect } from "next/navigation";

// /portal — resolves the logged-in client's slug and forwards there
export default async function PortalIndexPage() {
  const session = await auth();

  if (!session?.user?.clientId) redirect("/login");

  const client = await prisma.client.findUnique({
    where: { id: session.user.clientId },
    select: { slug: true },
  });

  if (!client) redirect("/login");

  redirect(`/portal/${client.slug}`);
}
