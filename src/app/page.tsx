import Link from "next/link";
import Builderpage from "@/harsh/loading_page"

import {  HydrateClient } from "@/trpc/server";


export default async function Home() {

  return (
    <HydrateClient>
      <main className="mt-20 h-full w-full flex flex-col items-center justify-center gap-6">
      
      <Builderpage />
   
      </main>
    </HydrateClient>
  );
}
