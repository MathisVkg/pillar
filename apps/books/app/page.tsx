import { redirect } from "next/navigation";

// Middleware redirects to /{lang}/dashboard, but this handles any direct hit to /
export default function Home() {
  redirect("/en/dashboard");
}
