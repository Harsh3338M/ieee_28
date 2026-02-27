import Link from "next/link";


import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

import { LoginButton } from "@/components/LoginButton";
import LevelDashboard from "@/components/LevelDashboard";
import SideNavigationBar from "@/components/SideNavigationBar";
export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="mt-20">
      
    <LevelDashboard/>
      </main>
    </HydrateClient>
  );
}
