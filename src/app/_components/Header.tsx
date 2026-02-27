/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { auth } from "@/server/auth";
import { LoginButton } from '@/components/LoginButton';
import CourseSwitcher from '@/components/CourseSwitcher';
import { HeaderWrapper } from '@/components/HeaderWrapper'; // Import the wrapper

const Header = async () => {
  const session = await auth();
  const user = session?.user;
const stats=  { points: user?.points ?? 0,
  exp: user?.xp ?? 0,
}
  return (
    <HeaderWrapper>
      {/* Notice: removed 'fixed' and 'top-0' here, wrapper does it now */}
      <header className="h-20 bg-[#09090b]/90 backdrop-blur-md border-b-4 border-zinc-800 flex items-center justify-center px-6">
        <div className="max-w-5xl w-full flex items-center justify-between">
          <CourseSwitcher />

          <div className="flex items-center gap-6">
            {user && (
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-zinc-700 group-hover:border-emerald-500 transition-colors">
                  <img 
                    src={user?.image ?? "https://avatar.vercel.sh/guest"} 
                    alt="profile" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <p className="hidden md:block text-sm font-black text-zinc-200 uppercase tracking-wider">
                  {user?.name}
                </p>
              </div>
            )}
            <div>
<UserStats points={stats.points} exp={stats.exp} />
            </div>
            <div className="flex items-center">
               <LoginButton />
            </div>
          </div>
        </div>
      </header>
    </HeaderWrapper>
  );
};

export default Header;

import { Flame, Star } from "lucide-react";

 function UserStats({ points, exp }: { points: number; exp: number }) {
  return (
    <div className="flex gap-4 p-4">
      {/* Points / Streak Style */}
      <div className="flex items-center gap-2 rounded-xl border-2 border-b-4 border-orange-400 bg-orange-50 px-4 py-2 transition-all hover:translate-y-[2px] hover:border-b-2">
        <Flame className="text-orange-500 fill-orange-500" size={24} />
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase text-orange-400 leading-none">Points</span>
          <span className="text-xl font-black text-orange-600">{points}</span>
        </div>
      </div>

      {/* EXP / Level Style */}
      <div className="flex items-center gap-2 rounded-xl border-2 border-b-4 border-blue-400 bg-blue-50 px-4 py-2 transition-all hover:translate-y-[2px] hover:border-b-2">
        <Star className="text-blue-500 fill-blue-500" size={24} />
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase text-blue-400 leading-none">Total EXP</span>
          <span className="text-xl font-black text-blue-600">{exp}</span>
        </div>
      </div>
    </div>
  );
}