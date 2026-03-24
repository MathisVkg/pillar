import { auth } from "@/lib/auth";
import { prisma } from "@pillar/database";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

// /portal — resolves the logged-in client's slug and forwards there
export default async function PortalIndexPage({ params }: Props) {
  const { locale } = await params;
  const session = await auth();

  if (!session?.user?.clientId) redirect(`/${locale}/login`);

  const client = await prisma.client.findUnique({
    where: { id: session.user.clientId },
    select: { slug: true },
  });

  if (!client) redirect(`/${locale}/login`);

  redirect(`/${locale}/portal/${client.slug}`);
}
