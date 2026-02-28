import { api } from "@/trpc/server";
import { Trophy, Star, Crown } from "lucide-react";

const Page = async () => {
  const allUsers = await api.profile.getAllUSers();

  // Sort by XP descending
  const rankedUsers = allUsers.sort((a, b) => b.xp - a.xp);

  return (
    <div className="min-h-screen bg-black pb-20 font-sans text-[#eeeeee]">
      {/* Top Navigation / Header */}
      <div className="mx-auto max-w-xl px-4 pt-12 text-center">
        <h1 className="mb-8 text-2xl font-black tracking-widest text-[#afafaf] uppercase">
          Leaderboard
        </h1>
        
        {/* Top 3 Podium Visual */}
        <div className="mb-10 flex items-end justify-center gap-4">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-[#37464f] border-4 border-[#52656d]" />
            <div className="mt-2 h-16 w-16 rounded-t-xl bg-[#37464f] flex items-center justify-center font-black text-[#afafaf] text-xl shadow-[0_4px_0_0_#212c33]">2</div>
          </div>
          {/* 1st Place */}
          <div className="flex flex-col items-center">
            <Crown className="mb-2 text-[#ffc800] drop-shadow-[0_0_8px_rgba(255,200,0,0.4)]" size={40} fill="#ffc800" />
            <div className="h-20 w-20 rounded-full bg-[#37464f] border-4 border-[#ffc800]" />
            <div className="mt-2 h-24 w-20 rounded-t-xl bg-[#ffc800] flex items-center justify-center font-black text-[#131f24] text-2xl shadow-[0_4px_0_0_#c79a00]">1</div>
          </div>
          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <div className="h-14 w-14 rounded-full bg-[#37464f] border-4 border-[#834b1a]" />
            <div className="mt-2 h-12 w-16 rounded-t-xl bg-[#834b1a] flex items-center justify-center font-black text-[#eeeeee] text-lg shadow-[0_4px_0_0_#5a3311]">3</div>
          </div>
        </div>
      </div>

      {/* The List */}
      <div className="mx-auto max-w-xl space-y-4 px-4">
        {rankedUsers.map((user, index) => (
          <div key={user.id} className="group relative">
            {/* Tactile Shadow (Darker than card) */}
            <div className="absolute inset-0 translate-y-1 rounded-2xl bg-[#212c33]" />
            
            {/* Main Card */}
            <div className="relative flex items-center gap-4 rounded-2xl border-2 border-[#37464f] bg-[#131f24] p-4 transition-all hover:bg-[#1c2d35] active:translate-y-1 active:shadow-none">
              
              {/* Rank Number */}
              <div className="flex w-8 items-center justify-center font-black text-[#52656d]">
                {index + 1}
              </div>

              {/* Avatar with Neon Ring */}
              <div className="h-12 w-12 rounded-full bg-[#58cc02] border-2 border-[#131f24] flex items-center justify-center font-black text-[#131f24] text-lg ring-2 ring-[#58cc02]/20">
                {user.user_name?.[0]?.toUpperCase() ?? "U"}
              </div>

              {/* User Info */}
              <div className="flex-grow">
                <h2 className="font-black text-[#eeeeee] text-lg leading-tight tracking-wide">
                  {user.user_name}
                </h2>
                <p className="text-xs font-bold text-[#52656d] uppercase tracking-wider">
                  {index < 3 ? "Top Tier" : "Challenger"}
                </p>
              </div>

              {/* XP Display */}
              <div className="flex items-center gap-2 rounded-xl bg-[#37464f]/30 px-3 py-1 font-black text-[#ffc800]">
                <Star size={16} fill="#ffc800" />
                <span>{user.xp} <span className="text-[10px] text-[#52656d]">XP</span></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;