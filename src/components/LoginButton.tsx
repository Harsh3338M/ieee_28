"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export function LoginButton() {
  const { data: session } = useSession();

  // Common styles for the "Tactile" look
  const baseStyles = "relative px-6 py-2 rounded-xl font-black uppercase tracking-wider text-sm transition-all duration-100 active:translate-y-1 active:border-b-0";

  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className={`${baseStyles} bg-zinc-800 text-zinc-400 border-b-4 border-zinc-950 hover:bg-zinc-700`}
      >
        Logout
      </button>
    );
  }

  return (
    <button
      onClick={() => signIn("discord")}
      className={`${baseStyles} bg-indigo-500 text-white border-b-4 border-indigo-700 hover:bg-indigo-400`}
    >
      Login with Discord
    </button>
  );
}