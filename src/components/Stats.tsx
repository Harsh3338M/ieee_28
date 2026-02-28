"use client"
import { Flame, Star } from "lucide-react";
import { api } from '@/trpc/react';

 export default function UserStats({ user_id }: { user_id: string }) {
  const { data: stats } = api.profile.getById.useQuery({ id: user_id }, { enabled: !!user_id });
  const points = stats?.points ?? 0;
  const exp = stats?.xp ?? 0;
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